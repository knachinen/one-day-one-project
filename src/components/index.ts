import React from 'react';
import { Button as ButtonComponent } from './Button';
import { Input as InputComponent } from './Input';
import { Timer as TimerComponent } from './Timer';

export const Button = React.memo(ButtonComponent);
export const Input = React.memo(InputComponent);
export const Timer = React.memo(TimerComponent);
