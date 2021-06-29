package common

import (
	"errors"
	"fmt"
	"strings"
)
type ConvertibleBoolean bool
func (bit *ConvertibleBoolean) UnmarshalJSON(data []byte) error {
    asString := string(data)

    if  strings.Contains(asString,"true") {
        *bit = true

    } else {
        return errors.New(fmt.Sprintf("Boolean unmarshal error: invalid input %s", asString))
    }


    return nil;

}