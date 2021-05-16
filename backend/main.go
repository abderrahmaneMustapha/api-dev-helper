package main

import (
    "fmt"
    "log"
    "net/http"
	"encoding/json"
	"github.com/gorilla/mux"
	"io/ioutil"
)

type Repository struct {
	FullName string `json:"full_name"`
	AvatarUrl string `json:"avatar_url"`
    /*CommitsCounts string `json:"commits_count"`
    PullRequestCounts string  `json:"pull_request_count"`
	ContributorsCounts string `json:"contributors_count"`
	MergesCounts string `json:"merges_counts"`
	Issues string `json:"issues"`*/
}

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


func returnRepo(w http.ResponseWriter, r *http.Request){
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

func handleRequests() {
	myRouter := mux.NewRouter().StrictSlash(true)

    myRouter.HandleFunc("/", homePage)
    //myRouter.HandleFunc("/articles", returnAllArticles)
	myRouter.HandleFunc("/repos/{owner}/{repo}", returnRepo)
   
    log.Fatal(http.ListenAndServe(":10000", myRouter))
}


func main() {
	
    handleRequests()
}