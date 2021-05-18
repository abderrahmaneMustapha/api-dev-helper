package planing
import (
    "fmt"
    "net/http"
	"github.com/go-playground/validator"
	"encoding/json"
	"apiDevHelper/common"	
)


func ValidatePlaning(w http.ResponseWriter, r *http.Request){
	common.EnableCors(&w)
	r.ParseForm() 
	validator_ := validator.New()

	var p  PlaningQuestions
	err := json.NewDecoder(r.Body).Decode(&p)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

	planingValidationError := validator_.Struct(p)
	
	if (planingValidationError !=nil){
		for _, e:= range planingValidationError.(validator.ValidationErrors) {			
			fmt.Println(w, e)
			http.Error(w, planingValidationError.Error(), http.StatusBadRequest)
			
		}
		return
	}

	p_marshaled, _ := json.Marshal(p)
    
	 // Do something with the Person struct...
	 fmt.Fprintf(w, "%+v", string(p_marshaled))
}