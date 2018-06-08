export default {
  cartocss: `
  #layer {
    marker-width: 8;
    marker-fill: #FF583E;
    marker-fill-opacity: 0.9;
    marker-line-width: 0.5;
    marker-line-color: #FFFFFF;
    marker-line-opacity: 1;
    marker-type: ellipse;
    marker-allow-overlap: false;
  }
`,
//   source: `
//   SELECT
//    *
//   FROM 
//   ne_10m_populated_places_simple
//   WHERE 
//   adm0name IN (SELECT admin FROM ne_adm0_europe)
//   `
// }

query: `
SELECT
       *
     FROM
       purvodka_master_attempt2_1
`
}