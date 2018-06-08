export default {
  name: "Vodka Layer",

  visible: true,

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

  query: `
SELECT
       *
     FROM
       purvodka_master_attempt2_1
`

// query: "SELECT * FROM purvodka_master_attempt2_1"


};
