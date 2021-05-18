package design
import (
	"os"
	"fmt"
	"io/ioutil"
	"encoding/json"
	"net/http"	
	"apiDevHelper/common"
	"github.com/go-playground/validator"
	"reflect"
)

func openJsonFile(path string) map[string][]DesignQuestionsData{
	jsonFile, err := os.Open(path)
	  // if we os.Open returns an error then handle it
	  if err != nil {
        fmt.Println(err)
		return nil
     }
    fmt.Println("File Successfully Opened at "+path)
    // defer the closing of our jsonFile so that we can parse it later on
    defer jsonFile.Close()

    byteValue, _ := ioutil.ReadAll(jsonFile)
    var result map[string][]DesignQuestionsData
    json.Unmarshal([]byte(byteValue), &result)

    
	return result;
}

func (b DesignQuestions) GetField(i int) string {
	val := reflect.ValueOf(b)
	t := val.Type()

	return t.Field(i).Tag.Get("json")
	
}

func findMatchedChoice( choice string, choices []DesignQuestionsDataChoices) int {

		for _, s := range choices {
			if (choice == s.Choice){
				return s.Score
			}
		}

		return 0;
}

func calculateScore(data map[string][]DesignQuestionsData, input DesignQuestions) int {
	score := 0
	
	score += findMatchedChoice(input.ApiAvailableFor, data["data"][0].Choices)
	score += findMatchedChoice(input.ApiMainProduct, data["data"][1].Choices)
	score += findMatchedChoice(input.ApiDx, data["data"][2].Choices)
	score += findMatchedChoice(input.Communication, data["data"][3].Choices)
	score += findMatchedChoice(input.Technology, data["data"][4].Choices)
	score += findMatchedChoice(input.OpenClosed, data["data"][5].Choices)

	return score

}
func ValidateDesign(w http.ResponseWriter, r *http.Request){
	common.EnableCors(&w)
    data := openJsonFile("data/designPhase.json")
	r.ParseForm() 
	validator_ := validator.New()

	var p   DesignQuestions
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

	score :=  calculateScore(data, p)
	approach := "Code First"
	if (score > 0){
		approach  = "Design First"
	}
	
	fmt.Fprintf(w, `{"approach"  : "`+approach+`"}`)
}



