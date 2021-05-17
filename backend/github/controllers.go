package  github
import (
    "fmt"
    "log"
    "net/http"
	"encoding/json"
	"github.com/gorilla/mux"
	"io/ioutil"
)



func ReturnRepo(w http.ResponseWriter, r *http.Request){
    vars := mux.Vars(r)
	
    repo := vars["repo"]
	owner:= vars["owner"]
	url := fmt.Sprintf("https://api.github.com/repos/%s/%s", owner , repo )

	resp, err  := http.Get(url)
	if err != nil {
		log.Fatalln(err)
		fmt.Fprintf(w,"Internal server error")
	 }

   body, err := ioutil.ReadAll(resp.Body)
   if err != nil {
      log.Fatalln(err)
   }

   var result Repository
   json.Unmarshal(body, &result)

   //sb := string( result )
   
   fmt.Fprintf(w, result.FullName)
}