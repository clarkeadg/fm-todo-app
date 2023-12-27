import { describe, it, expect } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';

import ThemeContextProvider from '../ThemeSwitcher/ThemeContext';
import Todos from './Todos';

describe('Renders Todos component correctly', async () => {

  const { container } = render(
    <ThemeContextProvider>
      <Todos/>
    </ThemeContextProvider>
  );
  
  it('Should have 0 items left', async () => {  
    const itemsLeft = screen.getByText('0 items left');
    expect(itemsLeft).not.toBeNull();
  });

  it('Should add 1 item', async () => {  
    fireEvent.input(screen.getByTestId('todos-input'), { target: { value: 'First todo item' }});
    fireEvent.submit(screen.getByTestId('todos-form'));

    const todoItem = screen.getByText('First todo item');
    expect(todoItem).not.toBeNull();

    const itemsLeft = screen.getByText('1 item left');
    expect(itemsLeft).not.toBeNull();
  });

  it('Should mark item complete', async () => {  
    fireEvent.click(screen.getByTestId('todos-toggle'));

    const todoItem = container.querySelector('.todos-item.completed');
    expect(todoItem).not.toBeNull();

    const itemsLeft = screen.getByText('0 items left');
    expect(itemsLeft).not.toBeNull();
  });

  it('Should show 0 active items', async () => {  
    fireEvent.click(screen.getAllByText('Active')[0]);

    const todoItem = container.querySelector('.todos-item');
    expect(todoItem).toBeNull();
  });

  it('Should show 1 completed items', async () => {  
    fireEvent.click(screen.getAllByText('Completed')[0]);

    const todoItem = container.querySelector('.todos-item');
    expect(todoItem).not.toBeNull();
  });

  it('Should remove completed items', async () => {  
    fireEvent.click(screen.getAllByText('Clear Completed')[0]);

    const todoItem = screen.queryByText('First todo item');
    expect(todoItem).toBeNull();

    const itemsLeft = screen.getByText('0 items left');
    expect(itemsLeft).not.toBeNull();
  }); 

  it('Should add and remove 1 item', async () => {  
    fireEvent.click(screen.getAllByText('All')[0]);
    
    fireEvent.input(screen.getByTestId('todos-input'), { target: { value: 'First todo item' }});
    fireEvent.submit(screen.getByTestId('todos-form'));

    fireEvent.click(screen.getByTestId('todos-delete'));

    const todoItem = screen.queryByText('First todo item');
    expect(todoItem).toBeNull();

    const itemsLeft = screen.getByText('0 items left');
    expect(itemsLeft).not.toBeNull();
  });  

});