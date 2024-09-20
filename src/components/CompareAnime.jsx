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
            spacing={{ xs: 1, md: 2, lg: 4, xl: 8 }}
            display="flex"
            justifyContent="center"
          >
            {person.map((details, index2) => (
              <Card
                key={index2}
                variant="outlined"
                sx={{ width: { xs: 75, sm: 120, md: 130, xl: 180 }, my: 1 }}
              >
                <CardMedia
                  sx={{ height: { xs: 100, sm: 150, xl: 200 } }}
                  image={details[2]}
                  component="img"
                />
                <CardContent sx={{ px: { xs: "0", sm: 1 } }}>
                  <Typography
                    sx={{
                      fontSize: { xs: 8, sm: 14, xl: 18 },
                    }}
                  >
                    {details[1]}
                  </Typography>
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
      <Container
        sx={{
          my: { xs: 1, md: 5 },
        }}
      >
        {intersect.length !== 0 ? (
          hihi()
        ) : (
          <Typography variant="h6" sx={{ my: 2 }}>
            No shared VAs here!
          </Typography>
        )}
      </Container>
    </>
  );
}
