package main

import (
    "fmt"
    "log"
    "net/http"
	"github.com/gorilla/mux"
    "apiDevHelper/github"
    "apiDevHelper/planing"
    "apiDevHelper/design"
)


// let's declare a global Articles array
// that we can then populate in our main function
// to simulate a database


func homePage(w http.ResponseWriter, r *http.Request){
    fmt.Fprintf(w, "Welcome to the HomePage!")
    fmt.Println("Endpoint Hit: homePage")
}

/*func returnAllArticles(w http.ResponseWriter, r *http.Request){
    fmt.Println("Endpoint Hit: returnAllArticles")
    json.NewEncoder(w).Encode(Articles)
}*/



func handleRequests() {
	myRouter := mux.NewRouter().StrictSlash(true)

    myRouter.HandleFunc("/", homePage)
    //myRouter.HandleFunc("/articles", returnAllArticles)
	myRouter.HandleFunc("/repos/{owner}/{repo}", github.ReturnRepo)
    myRouter.HandleFunc("/repos/{owner}/{repo}/branches", github.ReturnBraches)
    myRouter.HandleFunc("/repos/{owner}/{repo}/branches/{branch}/protection", github.ReturnBrancheProtection)
    myRouter.HandleFunc("/repos/{owner}/{repo}/issues", github.ReturnRepoIssues)
    myRouter.HandleFunc("/repos/{owner}/{repo}/pulls", github.ReturnPullRequests)    
   
    myRouter.HandleFunc("/steps/planing/validation", planing.ValidatePlaning)
    myRouter.HandleFunc("/steps/design/validation", design.ValidateDesign)
    
    log.Fatal(http.ListenAndServe(":10000", myRouter))
}


func main() {
	
    handleRequests()
}