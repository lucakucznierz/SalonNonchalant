// ID of the Google Sheet that holds all editable content (concerts, texts, line-up).
// It is the long part of the sheet URL: https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit
// The sheet must be shared as "Anyone with the link can view".
// While empty, the site uses the example files in public/data/.
export const SHEET_ID = '1S4g2EtQKjH2sYwQ1UiCcFTT6TAA627l936XrANXjRcI'

// Names of the tabs inside the Google Sheet (must match exactly).
export const TABS = {
  concerts: 'Konzerte',
  texts: 'Texte',
  lineup: 'Besetzung',
  members: 'Mitglieder'
}
