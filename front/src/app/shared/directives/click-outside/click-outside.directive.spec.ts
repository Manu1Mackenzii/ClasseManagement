import { ClickOutsideDirective } from './click-outside.directive';

describe('ClickOutsideDirective', () => {
  it('should create an instance', () => {
    const elementRef: any = {};
    const directive = new ClickOutsideDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
