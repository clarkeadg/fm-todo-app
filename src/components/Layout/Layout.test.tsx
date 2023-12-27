import { describe, it, expect } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';

import Layout from './Layout';
import ThemeContextProvider from '../ThemeSwitcher/ThemeContext';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';

describe('Renders Layout component correctly', async () => {

  const { container } = render(
    <ThemeContextProvider>
      <Layout>
        <ThemeSwitcher/>
      </Layout>
    </ThemeContextProvider>
  );
  
  it('Should have dark class', async () => {  
    fireEvent.click(screen.getByTestId('theme-switcher'));

    const main = container.querySelector('main.dark');
    expect(main).not.toBeNull();
  });

  it('Should have light class', async () => {  
    fireEvent.click(screen.getByTestId('theme-switcher'));

    const main = container.querySelector('main.light');
    expect(main).not.toBeNull();
  });

});