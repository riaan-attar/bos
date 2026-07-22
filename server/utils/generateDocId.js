/**
 * Generates a human-readable sequential document ID.
 * Format: PREFIX-YEAR-00001 (e.g. SINV-2026-00001)
 *
 * Strategy: count all records for the given year and pad count+1.
 * Uses the string-based docId field (e.g. invoiceId) to find the
 * latest sequence number for the year, making it safe even after
 * deletions or reseeds.
 *
 * @param {Model}  Model   - Sequelize model
 * @param {string} prefix  - Document prefix (e.g. 'SINV')
 * @param {string} docIdField - The field that holds the generated ID (e.g. 'invoiceId')
 * @param {number} [year]  - Year (defaults to current year)
 * @returns {Promise<string>}
 */
const generateDocId = async (Model, prefix, docIdField, year = new Date().getFullYear()) => {
  try {
    // Find the latest doc with this prefix and year to get highest sequence
    const yearStr = String(year);
    const latest = await Model.findOne({
      where: Model.sequelize.literal(
        `${docIdField} LIKE '${prefix}-${yearStr}-%'`
      ),
      order: [[docIdField, 'DESC']],
    });

    if (!latest || !latest[docIdField]) {
      return `${prefix}-${yearStr}-00001`;
    }

    const parts = latest[docIdField].split('-');
    const lastNum = parseInt(parts[parts.length - 1], 10);
    if (isNaN(lastNum)) {
      return `${prefix}-${yearStr}-00001`;
    }

    const nextNum = String(lastNum + 1).padStart(5, '0');
    return `${prefix}-${yearStr}-${nextNum}`;
  } catch (error) {
    console.error(`Error generating doc ID for ${prefix}:`, error);
    const fallbackYear = year || new Date().getFullYear();
    return `${prefix}-${fallbackYear}-00001`;
  }
};

module.exports = generateDocId;
