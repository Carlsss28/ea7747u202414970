import {FormGroup} from '@angular/forms';

/**
 * Base class for views that host a reactive form.
 *
 * @remarks
 * Offers the validation helpers shared by every form, so the validation
 * feedback is consistent across the application.
 *
 * @author Carla Gallardo
 */
export abstract class BaseForm {
  /**
   * Prefix of the translation keys used for validation messages.
   */
  private static readonly ERROR_KEY_PREFIX = 'form-errors';

  /**
   * Tells whether a control has to show its validation errors.
   *
   * @param form - The form that contains the control.
   * @param controlName - The name of the control.
   * @returns True when the control is invalid and the user already interacted with it.
   */
  protected isInvalidControl(form: FormGroup, controlName: string): boolean {
    const control = form.controls[controlName];
    return control.invalid && control.touched;
  }
  /**
   * Retrieves the translation keys of the validation errors of a control.
   *
   * @param form - The form that contains the control.
   * @param controlName - The name of the control.
   * @returns The translation keys, one per validation error (e.g., 'form-errors.required').
   */
  protected errorKeysForControl(form: FormGroup, controlName: string): string[] {
    const errors = form.controls[controlName].errors;
    return errors
      ? Object.keys(errors).map(errorKey => `${BaseForm.ERROR_KEY_PREFIX}.${errorKey}`)
      : [];
  }
}
