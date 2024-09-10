/* eslint-disable react/prop-types */
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function CompareAnime({ mediaA, mediaB, deezNuts }) {
  const intersect = new Array();

  const uwu = (mA, mB) => {
    for (const [k, v] of mB) {
      // console.log("k", k);
      // console.log("v", v);
      if (mA.has(k)) {
        if (v.length <= 3) {
          mA.forEach((a) => (a[0][0] === k ? v.push(a[1]) : null));
          [v[0], v[1]] = [v[1], v[0]];
        }
        // console.log(v);
        // v.reverse();
        intersect.push(v);
        // console.log("k", k);
      }
    }
  };
  uwu(mediaA, mediaB);
  console.log(intersect);

  const hihi = () => {
    console.log(intersect);
    return (
      <>
        {/* <Grid sx={{ width: 300 }}>{title(mediaA)}</Grid> */}
        {intersect.map((person, index) => (
          <Grid
            key={index}
            container
            spacing={12}
            sx={{ display: "flex", justifyContent: "center" }}
            // flexDirection="column"
          >
            {person.map((details, index2) => (
              <Card key={index2} variant="outlined" sx={{ width: 150, my: 1 }}>
                <CardMedia sx={{ height: 150 }} image={details[2]} />
                <CardContent>
                  <Typography>{details[1]}</Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>
        ))}
        {/* <Grid sx={{ width: 300 }}>{title(mediaB)}</Grid> */}
      </>
    );
  };
  deezNuts("lmao");
  return (
    <>
      <p>BREAD</p>
      {/* <h1>{mediaA}</h1>
      <h1>{mediaB}</h1> */}
      <h1>{hihi()}</h1>
    </>
  );
}
