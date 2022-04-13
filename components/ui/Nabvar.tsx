import NextLink from 'next/link';
import { Spacer, Text, useTheme, Link, Switch } from '@nextui-org/react';
import { useTheme as useNextTheme } from 'next-themes';
import Image from 'next/image';

export const Nabvar = () => {
  const { theme } = useTheme();
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        padding: '0 50px',
        backgroundColor: theme?.colors.gray900.value,
      }}
    >
      <Image
        alt="icon"
        width={70}
        height={70}
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
      />

      <NextLink href="/" passHref>
        <Link>
          <Text color="white" h2>
            P
          </Text>
          <Text color="white" h3>
            okemon
          </Text>
        </Link>
      </NextLink>

      <Spacer css={{ flex: 1 }} />
      <NextLink href="/favorites" passHref>
        <Link>
          <Text color="white">Favoritos</Text>
        </Link>
      </NextLink>
      <Spacer css={{ flex: 0 }} />
      <Text color="white" css={{
        paddingLeft: '20px',
        paddingRight: '20px'
      }}>
        Dark Mode
      </Text>
      <Switch
        checked={isDark}
        size="sm"
        shadow
        onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
      />
    </div>
  );
};
