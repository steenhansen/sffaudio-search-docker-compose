
console.log('222222222222222222222222', process.env.START_LOAD_DB, "22222222")




 if (process.env.START_LOAD_DB==='DB_SMALL_TEST'){

var google_sheets = {
    RSD_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/1QXaKKH9wqvDB3AHLWZk3u8GaKKfKndMAUatMr_HCGxQ/export?format=tsv",
    RSD_GOOGLE_VARIABLES: "https://docs.google.com/spreadsheets/d/1QXaKKH9wqvDB3AHLWZk3u8GaKKfKndMAUatMr_HCGxQ/export?format=tsv&gid=1799638635",  
    
    PODCAST_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/1FTCc7tWy_g4eFT0U5Jayg6AjoLyI9JutQbYbwJs7I4M/export?format=tsv",
    PODCAST_GOOGLE_VARIABLES: "https://docs.google.com/spreadsheets/d/1FTCc7tWy_g4eFT0U5Jayg6AjoLyI9JutQbYbwJs7I4M/export?format=tsv&gid=450982271", 
     
    PDF_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/1wZ2XURIlhkztN5e8-5csIi7jJI2s4F2FY0uM2ns4c7o/export?format=tsv",
    PDF_GOOGLE_VARIABLES: "https://docs.google.com/spreadsheets/d/1wZ2XURIlhkztN5e8-5csIi7jJI2s4F2FY0uM2ns4c7o/export?format=tsv&gid=1750187409",   
     
    POST_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/1r10opQHAJySPImS6K7GZr_GZvheD9p3V2RJnOTucyjY/export?format=tsv",
    QUALITY_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/1N2_v3MXhlOz-jxkWVcIVsMPNKqKkTS7POS26SBzxqP0/export?format=tsv"};            // default author for no search
}else{
    // below are real
    var google_sheets = {
    RSD_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/1VFMgWy6wmTkFIpeNW-NkZdWmpz5iZcuULgMpjn8_QgU/export?format=tsv",
    RSD_GOOGLE_VARIABLES: "https://docs.google.com/spreadsheets/d/19SV8Dk5yc49gMBoUVSE6aGOigdTWJ0cgggFo3AdQl6Y/export?format=tsv&gid=1799638635",       // test rsd
    PODCAST_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/1cWtA1AaY83cBuU_6vt64adDeR-dfT-X1U5VgvCRVMAg/export?format=tsv",
    PODCAST_GOOGLE_VARIABLES: "https://docs.google.com/spreadsheets/d/1DKkNYP_s5SU5uloXzX5JjOTEZquTlVbKurIGQTe3_Wk/export?format=tsv&gid=607409390",   // test podcast
    PDF_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/1sbQ8NR7hvcm4EjSlyhmte0rYtI_G3vnc1o5KLPAW2lc/export?format=tsv",
    PDF_GOOGLE_VARIABLES: "https://docs.google.com/spreadsheets/d/17TwPecDRNw5JS9_WT6t3cl40e5M46z8ALwnvFalHDZc/export?format=tsv&gid=1750187409",    // test pdf
    POST_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/1C18lpo5-Dj4G0tGfq1AlodPcM4AX_6ITUL3mjsTQ3b0/export?format=tsv",
    QUALITY_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/1N2_v3MXhlOz-jxkWVcIVsMPNKqKkTS7POS26SBzxqP0/export?format=tsv"};
}


console.log('gggggggggggggggggggggggggggggggggggg, google_sheets== ',  google_sheets)

module.exports = google_sheets
