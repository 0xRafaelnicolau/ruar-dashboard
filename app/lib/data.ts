import postgres from 'postgres';
import {
  CollaboratorField,
  CustomerField,
  Revenue,
  Costs,
  Profit,
  ServicesTable,
  ServiceWithPayments,
  Payment
} from './definitions';

// Ensure database connection with proper error handling
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require', });

const ITEMS_PER_PAGE = 8;

/*//////////////////////////////////////////////////////////////
                        COLLABORATOR
//////////////////////////////////////////////////////////////*/

export async function fetchCollaborators() {
  try {
    const collaborators = await sql<CollaboratorField[]>`
        SELECT
          id,
          name
        FROM collaborators
        ORDER BY name ASC
      `;

    return collaborators || [];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all collaborators.');
  }
}

export async function fetchCollaboratorEarnings() {
  try {
    const collaboratorEarnings = await sql`
      SELECT 
        c.id,
        c.name,
        COALESCE(SUM(p.amount), 0) as total_earnings
      FROM collaborators c
      LEFT JOIN payments p ON c.id = p.collaborator_id AND p.type = 'outgoing' AND p.status = 'paid'
      GROUP BY c.id, c.name
      ORDER BY total_earnings DESC
    `;

    return collaboratorEarnings || [];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch collaborator earnings.');
  }
}

/*//////////////////////////////////////////////////////////////
                        CUSTOMER
//////////////////////////////////////////////////////////////*/

export async function fetchCustomers() {
  try {
    const customers = await sql<CustomerField[]>`
        SELECT
          id,
          name
        FROM customers
        ORDER BY name ASC
      `;

    return customers || [];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchNumberOfCustomers() {
  try {
    const customersCount = await sql`SELECT COUNT(*) as count FROM customers`;
    return customersCount[0]?.count || 0;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the total number of customers.');
  }
}

/*//////////////////////////////////////////////////////////////
                        SERVICE
//////////////////////////////////////////////////////////////*/

export async function fetchServiceAndPayments(id: string) {
  try {
    // First, fetch the service with customer information
    const [service] = await sql<ServiceWithPayments[]>`
      SELECT
        s.id,
        s.customer_id,
        s.name,
        s.description,
        s.type,
        c.name as customer_name,
        c.email as customer_email
      FROM services s
      JOIN customers c ON s.customer_id = c.id
      WHERE s.id = ${id}
    `;

    if (!service) {
      throw new Error('Service not found');
    }

    // Then, fetch all payments associated with this service
    const payments = await sql<Payment[]>`
      SELECT
        p.id,
        p.service_id,
        p.collaborator_id,
        p.amount,
        p.date,
        p.description,
        p.type,
        p.status
      FROM payments p
      WHERE p.service_id = ${id}
      ORDER BY p.date DESC
    `;

    // Combine service and payments
    const serviceWithPayments: ServiceWithPayments = {
      ...service,
      payments: payments || []
    };

    return serviceWithPayments;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch service and payments.');
  }
}

export async function fetchNumberOfServices() {
  try {
    const servicesCount = await sql`SELECT COUNT(*) as count FROM services`;
    return servicesCount[0]?.count || 0;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the total number of services.');
  }
}

export async function fetchFilteredServices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const services = await sql<ServicesTable[]>`
      SELECT
        s.id,
        s.name as service_name,
        c.name as customer_name,
        c.email,
        s.type,
        s.description,
        COALESCE(SUM(CASE WHEN p.type = 'incoming' THEN p.amount ELSE 0 END), 0) as amount,
        COALESCE(MIN(p.date), CURRENT_DATE) as date
      FROM services s
      JOIN customers c ON s.customer_id = c.id
      LEFT JOIN payments p ON s.id = p.service_id
      WHERE
        c.name ILIKE ${`%${query}%`} OR
        c.email ILIKE ${`%${query}%`} OR
        s.name ILIKE ${`%${query}%`} OR
        s.description ILIKE ${`%${query}%`} OR
        s.type ILIKE ${`%${query}%`}
      GROUP BY s.id, s.name, c.name, c.email, s.type, s.description
      ORDER BY date DESC, s.id DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return services;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch services.');
  }
}

export async function fetchServicesPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(DISTINCT s.id)
    FROM services s
    JOIN customers c ON s.customer_id = c.id
    WHERE
      c.name ILIKE ${`%${query}%`} OR
      c.email ILIKE ${`%${query}%`} OR
      s.name ILIKE ${`%${query}%`} OR
      s.description ILIKE ${`%${query}%`} OR
      s.type ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of services.');
  }
}

/*//////////////////////////////////////////////////////////////
                        PAYMENT
//////////////////////////////////////////////////////////////*/

export async function fetchTotalPayments() {
  try {
    const totalPayments = await sql`
      SELECT COALESCE(SUM(amount), 0) as total_payments 
      FROM payments 
      WHERE type = 'incoming'
    `;

    return totalPayments[0]?.total_payments || 0;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total payments data.');
  }
}

export async function fetchTotalCollected() {
  try {
    const paidPayments = await sql`
      SELECT COALESCE(SUM(amount), 0) as total_amount 
      FROM payments 
      WHERE status = 'paid' AND type = 'incoming'
    `;

    return paidPayments[0]?.total_amount || 0;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the total amount of paid payments.');
  }
}

export async function fetchTotalPending() {
  try {
    const pendingPayments = await sql`
      SELECT COALESCE(SUM(amount), 0) as total_amount 
      FROM payments 
      WHERE status = 'pending' AND type = 'incoming'
    `;

    return pendingPayments[0]?.total_amount || 0;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the total amount of pending payments.');
  }
}

/*//////////////////////////////////////////////////////////////
                        REVENUE
//////////////////////////////////////////////////////////////*/

export async function fetchRevenue(): Promise<Revenue[]> {
  try {
    const revenue = await sql<Revenue[]>`
      WITH months AS (
        SELECT generate_series(
          date_trunc('month', CURRENT_DATE - INTERVAL '11 months'),
          date_trunc('month', CURRENT_DATE),
          '1 month'::interval
        )::date as month_date
      ),
      monthly_revenue AS (
        SELECT 
          TO_CHAR(date, 'Mon') as month,
          EXTRACT(MONTH FROM date) as month_num,
          COALESCE(SUM(amount), 0) as revenue
        FROM payments 
        WHERE 
          type = 'incoming' 
          AND date >= CURRENT_DATE - INTERVAL '12 months'
        GROUP BY TO_CHAR(date, 'Mon'), EXTRACT(MONTH FROM date)
      )
      SELECT 
        TO_CHAR(m.month_date, 'Mon') as month,
        COALESCE(mr.revenue, 0) as revenue
      FROM months m
      LEFT JOIN monthly_revenue mr ON TO_CHAR(m.month_date, 'Mon') = mr.month
      ORDER BY m.month_date ASC
    `;

    return revenue || [];
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}

/*//////////////////////////////////////////////////////////////
                        COSTS
//////////////////////////////////////////////////////////////*/

export async function fetchCosts(): Promise<Costs[]> {
  try {
    const costs = await sql<Costs[]>`
      WITH months AS (
        SELECT generate_series(
          date_trunc('month', CURRENT_DATE - INTERVAL '11 months'),
          date_trunc('month', CURRENT_DATE),
          '1 month'::interval
        )::date as month_date
      ),
      monthly_costs AS (
        SELECT 
          TO_CHAR(date, 'Mon') as month,
          EXTRACT(MONTH FROM date) as month_num,
          COALESCE(SUM(amount), 0) as costs
        FROM payments 
        WHERE 
          type = 'outgoing' 
          AND date >= CURRENT_DATE - INTERVAL '12 months'
        GROUP BY TO_CHAR(date, 'Mon'), EXTRACT(MONTH FROM date)
      )
      SELECT 
        TO_CHAR(m.month_date, 'Mon') as month,
        COALESCE(mc.costs, 0) as costs
      FROM months m
      LEFT JOIN monthly_costs mc ON TO_CHAR(m.month_date, 'Mon') = mc.month
      ORDER BY m.month_date ASC
    `;

    return costs || [];
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}

/*//////////////////////////////////////////////////////////////
                        PROFIT
//////////////////////////////////////////////////////////////*/

export async function fetchProfit(): Promise<Profit[]> {
  try {
    const profit = await sql<Profit[]>`
      WITH months AS (
        SELECT generate_series(
          date_trunc('month', CURRENT_DATE - INTERVAL '11 months'),
          date_trunc('month', CURRENT_DATE),
          '1 month'::interval
        )::date as month_date
      ),
      monthly_revenue AS (
        SELECT 
          TO_CHAR(date, 'Mon') as month,
          COALESCE(SUM(amount), 0) as revenue
        FROM payments 
        WHERE 
          type = 'incoming' 
          AND date >= CURRENT_DATE - INTERVAL '12 months'
        GROUP BY TO_CHAR(date, 'Mon')
      ),
      monthly_costs AS (
        SELECT 
          TO_CHAR(date, 'Mon') as month,
          COALESCE(SUM(amount), 0) as costs
        FROM payments 
        WHERE 
          type = 'outgoing' 
          AND date >= CURRENT_DATE - INTERVAL '12 months'
        GROUP BY TO_CHAR(date, 'Mon')
      )
      SELECT 
        TO_CHAR(m.month_date, 'Mon') as month,
        COALESCE(mr.revenue, 0) - COALESCE(mc.costs, 0) as profit
      FROM months m
      LEFT JOIN monthly_revenue mr ON TO_CHAR(m.month_date, 'Mon') = mr.month
      LEFT JOIN monthly_costs mc ON TO_CHAR(m.month_date, 'Mon') = mc.month
      ORDER BY m.month_date ASC
    `;

    return profit || [];
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}

export async function fetchTotalProfit() {
  try {
    const totalProfit = await sql`
      SELECT 
        COALESCE(
          (SELECT COALESCE(SUM(amount), 0) FROM payments WHERE type = 'incoming') -
          (SELECT COALESCE(SUM(amount), 0) FROM payments WHERE type = 'outgoing'),
          0
        ) as total_profit
    `;

    return totalProfit[0]?.total_profit || 0;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total profit data.');
  }
}