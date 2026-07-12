/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import FirstUseNotice from '../src/components/FirstUseNotice';
import { UI_MESSAGES } from '../src/lib/messages';

describe('FirstUseNotice', () => {
  test('renders the first-use message in a note', () => {
    render(<FirstUseNotice />);

    const note = screen.getByRole('note');

    expect(note).toBeTruthy();
    expect(note.textContent).toBe(UI_MESSAGES.firstUse);
  });
});
