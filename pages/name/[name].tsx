import React, { useState } from 'react';

import {
  Button,
  Card,
  Container,
  Grid,
  Image,
  Progress,
  Spacer,
  Text,
} from '@nextui-org/react';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';

import confetti from 'canvas-confetti';

import { pokeApi } from '../../api';
import { Layout } from '../../components/layouts';
import { getPokemonInfo, localFavorites } from '../../utils';
import { PokemonListResponse } from '../../interfaces/pokemon-list';

interface Props {
  pokemon: any;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
  console.log(pokemon);
  const [isInFavorites, setIsInFavorites] = useState(
    localFavorites.existInFavorites(pokemon.id)
  );
  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites(!isInFavorites);
    if (isInFavorites) return;
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    });
  };

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  '/no-image.png'
                }
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>
              <Button
                color="gradient"
                ghost={!isInFavorites}
                onClick={onToggleFavorite}
              >
                {isInFavorites ? 'En Favoritos' : 'Guardar en favoritos'}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites: </Text>
              <Container direction="row" display="flex" gap={0}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Text h2>About</Text>
              <div style={{ display: 'flex', alignContent: 'flex-start' }}>
                <Text h4>
                  Height:{' '}
                  <Text span css={{ fontWeight: 'normal' }}>
                    {pokemon.height} in
                  </Text>
                </Text>
              </div>
              <div style={{ display: 'flex', alignContent: 'flex-start' }}>
                <Text h4>
                  Weight:{' '}
                  <Text span css={{ fontWeight: 'normal' }}>
                    {pokemon.weight} lb
                  </Text>
                </Text>
              </div>
              <div style={{ display: 'flex', alignContent: 'flex-start' }}>
                <Text h4>
                  Abilities:{' '}
                  <Text
                    transform="capitalize"
                    span
                    css={{ fontWeight: 'normal' }}
                  >
                    {pokemon.abilities.map(({ ability }: any) => {
                      return `${ability.name}, `;
                    })}
                  </Text>
                </Text>
              </div>
              <div style={{ display: 'flex', alignContent: 'flex-start' }}>
                <Text h4>
                  Type:{' '}
                  <Text
                    transform="capitalize"
                    span
                    css={{ fontWeight: 'normal' }}
                  >
                    {pokemon.types.map(({ type }: any) => {
                      return `${type.name}, `;
                    })}
                  </Text>
                </Text>
              </div>
              <Card.Image
                src={
                  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png` ||
                  '/no-image.png'
                }
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Text h2 transform="capitalize">
                Base Stats
              </Text>
            </Card.Header>
            <Card.Body>
              {pokemon.stats.map((statics: any) => {
                return (
                  <>
                    <Text transform='capitalize' size={16}>{statics.stat.name}</Text>
                    <Progress color="primary" value={statics.base_stat} />
                    <Spacer />
                  </>
                );
              })}
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
  const pokemonNames: string[] = data.results.map((pokemon) => pokemon.name);
  return {
    paths: pokemonNames.map((name) => ({
      params: { name },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };
  return {
    props: {
      pokemon: await getPokemonInfo(name),
    },
  };
};

export default PokemonByNamePage;
