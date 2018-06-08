export default {
    name: 'vodka',

    visible: true,

    cartocss: `
    #layer {
          marker-width: ramp([montant_periode_en_cours], range(5, 20), quantiles(5));
          marker-fill: ramp([montant_tx_croissance_annuel], (#cf597e, #ed9c72, #e9e29c, #71be83, #009392), quantiles);
          marker-fill-opacity: 1;
          marker-allow-overlap: true;
          marker-line-width: 1;
          marker-line-color: #FFFFFF;
          marker-line-opacity: 1;
    }
  `,

    query: `
    SELECT
      *
    FROM
    purvodka_master_attempt2_1
  `,

    options: {
        featureClickColumns: ['montant_periode_en_cours', 'montant_periode_precedente', 'marque']
    }
};
