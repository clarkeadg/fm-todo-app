import { describe, it, expect } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';

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

  it('Should have a moon icon', async () => {  
    fireEvent.click(screen.getByTestId('theme-switcher'));

    const buttonImage = container.querySelector(`.theme-switcher img[src="${moontIconUrl}"]`);
    expect(buttonImage).not.toBeNull();
  });

  it('Should have a sun icon', async () => {  
    fireEvent.click(screen.getByTestId('theme-switcher'));

    const buttonImage = container.querySelector(`.theme-switcher img[src="${sunIconUrl}"]`);
    expect(buttonImage).not.toBeNull();
  });

});