/* eslint-disable react/prop-types */
import "./App.css";

import { useQuery, gql } from "@apollo/client";

const GET_ANIME = gql`
  query ($id: [Int]) {
    page: Page {
      media: media(type: ANIME, id_in: $id) {
        ...comparison
      }
    }
  }

  fragment comparison on Media {
    id
    coverImage {
      medium
    }
    title {
      english
      romaji
    }
    characters {
      edges {
        id
        node {
          id
          name {
            userPreferred
          }
        }
        voiceActors(language: JAPANESE) {
          id
          name {
            userPreferred
          }
        }
      }
    }
  }
`;
function DisplayAnime({ animeId, animeLanguage }) {
  const { loading, error, data } = useQuery(GET_ANIME, {
    variables: { id: animeId, language: animeLanguage },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  //   console.log(data.page.media[0]);
  //   console.log(data.page.media[1]);

  const showMedia = ({ page: { media } }) => {
    const mediaA = media[0];
    const mediaB = media[1];
    const title = (m) => {
      return (
        <div>
          <p>{m.title.english ? m.title.english : m.title.romaji}</p>
          <img src={m.coverImage.medium} />
        </div>
      );
    };
    const charaList = (m) => {
      return (
        <tr>
          <th scope="row">Character</th>
          {m.characters.edges.map((edge, index) => (
            <td key={index}>{edge.node.name.userPreferred}</td>
          ))}
        </tr>
      );
    };
    const vaList = (m) => {
      return (
        <tr>
          <th scope="row">Voice Actor</th>
          {m.characters.edges.map((edge) => (
            <td key={edge.id}>
              {edge.voiceActors && edge.voiceActors.length > 0
                ? edge.voiceActors.map((va, i) => (
                    <span key={i + 1}>
                      {va.name.userPreferred}
                      {i < edge.voiceActors.length - 1 && ", "}
                    </span>
                  ))
                : "-"}
            </td>
          ))}
        </tr>
      );
    };
    return (
      <tbody>
        {title(mediaA)}
        {charaList(mediaA)}
        {vaList(mediaA)}
        {title(mediaB)}
        {charaList(mediaB)}
        {vaList(mediaB)}
      </tbody>
    );
  };

  //   console.log(data);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>hihi</th>
          </tr>
        </thead>
        {showMedia(data)}
      </table>
    </div>
  );
}

export default function ListAnime() {
  return (
    <div>
      <DisplayAnime animeId={[87495, 105595]} animeLanguage={"JAPANESE"} />
      {/* <DisplayAnime animeId={105595} animeLanguage={"JAPANESE"} /> */}
    </div>
  );
}
