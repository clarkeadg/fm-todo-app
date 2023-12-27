import { describe, it, expect } from 'vitest';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';

import moontIconUrl from '../../assets/images/icon-moon.svg';
import sunIconUrl from '../../assets/images/icon-sun.svg';

import ThemeSwitcher from './ThemeSwitcher';
import ThemeContextProvider from './ThemeContext';

describe('Renders ThemeSwitcher component correctly', async () => {

  const { container } = render(
    <ThemeContextProvider>
      <ThemeSwitcher/>
    </ThemeContextProvider>
  );
  
  it('Should have a sun icon', async () => {  
    fireEvent.click(screen.getByTestId('theme-switcher'));

    const buttonImage = container.querySelector('.theme-switcher img');
    expect(buttonImage.src).to.equal('http://localhost:3000'+sunIconUrl);
  });

  it('Should have a moon icon', async () => {  
    fireEvent.click(screen.getByTestId('theme-switcher'));

    const buttonImage = container.querySelector('.theme-switcher img');
    expect(buttonImage.src).to.equal('http://localhost:3000'+moontIconUrl);
  });

});