package design
import (
	"os"
	"fmt"
	"io/ioutil"
	//"encoding/json"
	"net/http"	
)

func openJsonFile(path string) string {
	jsonFile, err := os.Open(path)
	  // if we os.Open returns an error then handle it
	  if err != nil {
        fmt.Println(err)
		return ""
     }
    fmt.Println("File Successfully Opened at "+path)
    // defer the closing of our jsonFile so that we can parse it later on
    defer jsonFile.Close()

    byteValue, _ := ioutil.ReadAll(jsonFile)
     // enable this to access it as dict 
    ///var result map[string]interface{}
    //json.Unmarshal([]byte(byteValue), &result)

    
	return string(byteValue);
}


func ValidateDesign(w http.ResponseWriter, r *http.Request){
    data := openJsonFile("data/designPhase.json")
	fmt.Fprintf(w, "%+v", data)
}



