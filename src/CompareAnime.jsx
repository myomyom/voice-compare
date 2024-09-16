/* eslint-disable react/prop-types */
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function CompareAnime({ mediaA, mediaB }) {
  let intersect = new Array();

  for (const [k, v] of mediaA) {
    if (mediaB.has(k)) {
      if (v.length < 3) {
        mediaB.forEach((a) => (a[0][0] === k ? v.push(a[1]) : null));
        [v[0], v[1]] = [v[1], v[0]];
      }
      intersect.push(v);
    }
  }

  const hihi = () => {
    return (
      <>
        {intersect.map((person, index) => (
          <Grid
            key={index}
            container
            spacing={8}
            display="flex"
            justifyContent="center"
          >
            {person.map((details, index2) => (
              <Card key={index2} variant="outlined" sx={{ width: 130, my: 1 }}>
                <CardMedia
                  sx={{ height: 150 }}
                  image={details[2]}
                  component="img"
                />
                <CardContent>
                  <Typography sx={{ fontSize: 14 }}>{details[1]}</Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>
        ))}
      </>
    );
  };
  return (
    <>
      <Container sx={{ my: 5 }}>
        {intersect.length === 0 ? (
          <Typography variant="h6" sx={{ my: 2 }}>
            No shared VAs here!
          </Typography>
        ) : (
          hihi()
        )}
      </Container>
    </>
  );
}
