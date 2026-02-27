/***************************  WINDMILL API SERVICE  ***************************/

const WINDMILL_BASE = import.meta.env.VITE_WINDMILL_URL || 'http://localhost:8000';
const WINDMILL_WORKSPACE = import.meta.env.VITE_WINDMILL_WORKSPACE || 'marketingtool';
const WINDMILL_TOKEN = import.meta.env.VITE_WINDMILL_TOKEN || '';

async function windmillFetch(path, options = {}) {
  const url = `${WINDMILL_BASE}/api/w/${WINDMILL_WORKSPACE}${path}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(WINDMILL_TOKEN ? { Authorization: `Bearer ${WINDMILL_TOKEN}` } : {}),
      ...options.headers
    }
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`Windmill API error ${response.status}: ${errorText}`);
  }

  return response.json();
}

/**
 * Execute a tool generation via Windmill
 * @param {string} toolSlug - Tool identifier (e.g. 'blog-writer')
 * @param {string} toolName - Display name (e.g. 'Blog Writer')
 * @param {string} mainInput - Primary user input
 * @param {Object} additionalInputs - Extra form fields (tone, wordCount, etc.)
 * @param {string} userId - Appwrite user ID
 * @returns {Promise<Object>} Generation result
 */
export async function executeGeneration({ toolSlug, toolName, mainInput, additionalInputs = {}, userId }) {
  return windmillFetch('/jobs/run_wait_result/f/marketingtool/generate', {
    method: 'POST',
    body: JSON.stringify({
      toolSlug,
      toolName,
      input: mainInput.slice(0, 5000),
      additionalInputs,
      userId
    })
  });
}

/**
 * Execute AI chat via Windmill (WEB - not mobile)
 * @param {string} message - User message
 * @param {string} sessionId - Chat session ID
 * @param {string} userId - Appwrite user ID
 * @returns {Promise<Object>} Chat response
 */
export async function executeChat({ message, sessionId, userId }) {
  return windmillFetch('/jobs/run_wait_result/p/f/web/chat_ai', {
    method: 'POST',
    body: JSON.stringify({ message, sessionId, userId })
  });
}

/**
 * Fetch campaign metrics from Windmill (proxies to Supabase)
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Metrics data
 */
export async function fetchMetrics(params = {}) {
  return windmillFetch('/jobs/run_wait_result/f/marketingtool/fetch_metrics', {
    method: 'POST',
    body: JSON.stringify(params)
  });
}

/**
 * Fetch campaigns list from Windmill (proxies to Supabase)
 * @param {Object} filters - Filter parameters (platform, status, dateRange)
 * @returns {Promise<Object>} Campaigns list
 */
export async function fetchCampaigns(filters = {}) {
  return windmillFetch('/jobs/run_wait_result/f/marketingtool/fetch_campaigns', {
    method: 'POST',
    body: JSON.stringify(filters)
  });
}

/**
 * Fetch dashboard summary data
 * @returns {Promise<Object>} Dashboard KPIs and chart data
 */
export async function fetchDashboardSummary() {
  return windmillFetch('/jobs/run_wait_result/f/marketingtool/dashboard_summary', {
    method: 'POST',
    body: JSON.stringify({})
  });
}

/**
 * Run a Meta audit
 * @param {string} adAccountId - Meta ad account ID
 * @param {string} userId - Appwrite user ID
 * @returns {Promise<Object>} Audit results
 */
export async function runMetaAudit({ adAccountId, userId }) {
  return windmillFetch('/jobs/run_wait_result/f/marketingtool/meta_audit', {
    method: 'POST',
    body: JSON.stringify({ adAccountId, userId })
  });
}

/**
 * Fetch generation history
 * @param {string} userId - Appwrite user ID
 * @param {Object} filters - Optional filters (toolSlug, dateRange)
 * @returns {Promise<Object>} History records
 */
export async function fetchHistory({ userId, ...filters }) {
  return windmillFetch('/jobs/run_wait_result/f/marketingtool/fetch_history', {
    method: 'POST',
    body: JSON.stringify({ userId, ...filters })
  });
}

/**
 * Search competitor ads via Ad Library
 * @param {Object} params - Search parameters
 * @param {string} params.query - Search query (brand, keyword, topic)
 * @param {string} [params.platform] - Platform filter (facebook, instagram, google)
 * @param {string} [params.dateRange] - Date range (7d, 30d, 90d, 1y)
 * @param {string} [params.country] - Country code
 * @returns {Promise<Object>} Search results with ads array
 */
export async function searchAdLibrary(params = {}) {
  return windmillFetch('/jobs/run_wait_result/f/marketingtool/search_ad_library', {
    method: 'POST',
    body: JSON.stringify(params)
  });
}

/**
 * Fetch connected ad accounts for the user
 * @param {string} userId - Appwrite user ID
 * @returns {Promise<Object>} Connected accounts list
 */
export async function fetchAdAccounts({ userId }) {
  return windmillFetch('/jobs/run_wait_result/f/marketingtool/fetch_ad_accounts', {
    method: 'POST',
    body: JSON.stringify({ userId })
  });
}
