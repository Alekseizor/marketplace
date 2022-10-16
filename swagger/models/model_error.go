// Code generated by go-swagger; DO NOT EDIT.

package models

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"context"

	"github.com/go-openapi/strfmt"
	"github.com/go-openapi/swag"
)

// ModelError model error
//
// swagger:model model.Error
type ModelError struct {

	// description
	Description string `json:"description,omitempty"`

	// error
	Error string `json:"error,omitempty"`

	// type
	Type string `json:"type,omitempty"`
}

// Validate validates this model error
func (m *ModelError) Validate(formats strfmt.Registry) error {
	return nil
}

// ContextValidate validates this model error based on context it is used
func (m *ModelError) ContextValidate(ctx context.Context, formats strfmt.Registry) error {
	return nil
}

// MarshalBinary interface implementation
func (m *ModelError) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *ModelError) UnmarshalBinary(b []byte) error {
	var res ModelError
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}
