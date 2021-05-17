package planing
import (
    "fmt"
    "net/http"
	"github.com/go-playground/validator"
	"encoding/json"
	
)


func ValidatePlaning(w http.ResponseWriter, r *http.Request){
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
		for _, e := range planingValidationError.(validator.ValidationErrors) {
			fmt.Println(e)
		}
	}
    
	 // Do something with the Person struct...
	 fmt.Fprintf(w, "Person: %+v", p)
}