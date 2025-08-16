import postgres from 'postgres';
import {
  ManagerField,
  CustomerField,
  Revenue,
  Costs,
  Profit
} from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

/*//////////////////////////////////////////////////////////////
                        MANAGER
//////////////////////////////////////////////////////////////*/

export async function fetchManagers() {
  try {
    const managers = await sql<ManagerField[]>`
        SELECT
          id,
          name
        FROM managers
        ORDER BY name ASC
      `;

    return managers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all managers.');
  }
}

/*//////////////////////////////////////////////////////////////
                        MANAGER
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

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchNumberOfCustomers() {
  try {
    const customersCount = await sql`SELECT COUNT(*) FROM customers`;
    return customersCount[0].count;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the total number of customers.');
  }
}

/*//////////////////////////////////////////////////////////////
                        SERVICE
//////////////////////////////////////////////////////////////*/

export async function fetchNumberOfServices() {
  try {
    const servicesCount = await sql`SELECT COUNT(*) FROM services`;
    return servicesCount[0].count;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the total number of services.');
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

    return totalPayments[0].total_payments;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total payments data.');
  }
}

export async function fetchPaidPayments() {
  try {
    const paidPayments = await sql`
      SELECT COALESCE(SUM(amount), 0) as total_amount 
      FROM payments 
      WHERE status = 'paid' AND type = 'incoming'
    `;

    return paidPayments[0].total_amount;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the total amount of paid payments.');
  }
}

export async function fetchPendingPayments() {
  try {
    const pendingPayments = await sql`
      SELECT COALESCE(SUM(amount), 0) as total_amount 
      FROM payments 
      WHERE status = 'pending' AND type = 'incoming'
    `;

    return pendingPayments[0].total_amount;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the total amount of pending payments .');
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

    return revenue;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
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
          COALESCE(SUM(amount), 0) as revenue
        FROM payments 
        WHERE 
          type = 'outgoing' 
          AND date >= CURRENT_DATE - INTERVAL '12 months'
        GROUP BY TO_CHAR(date, 'Mon'), EXTRACT(MONTH FROM date)
      )
      SELECT 
        TO_CHAR(m.month_date, 'Mon') as month,
        COALESCE(mc.revenue, 0) as revenue
      FROM months m
      LEFT JOIN monthly_costs mc ON TO_CHAR(m.month_date, 'Mon') = mc.month
      ORDER BY m.month_date ASC
    `;

    return costs;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch costs data.');
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
        COALESCE(mr.revenue, 0) - COALESCE(mc.costs, 0) as revenue
      FROM months m
      LEFT JOIN monthly_revenue mr ON TO_CHAR(m.month_date, 'Mon') = mr.month
      LEFT JOIN monthly_costs mc ON TO_CHAR(m.month_date, 'Mon') = mc.month
      ORDER BY m.month_date ASC
    `;

    return profit;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch profit data.');
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

    return totalProfit[0].total_profit;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total profit data.');
  }
}