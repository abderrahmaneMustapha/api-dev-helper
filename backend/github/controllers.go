package  github
import (
    "fmt"
    "log"
    "net/http"
	"encoding/json"
	"github.com/gorilla/mux"
	"io/ioutil"
    "apiDevHelper/common"
    "strings"
)



func ReturnRepo(w http.ResponseWriter, r *http.Request){
    common.EnableCors(&w)

    vars := mux.Vars(r)
	
    repo := vars["repo"]
	owner:= vars["owner"]
	url := fmt.Sprintf("https://api.github.com/repos/%s/%s", owner , repo )

	resp := common.GetFromGhApi(url)
    
    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
      log.Fatalln(err)
    }

    var repository Repository
    json.Unmarshal(body, &repository)

    result, _ :=  json.Marshal(repository)
   
   fmt.Fprintf(w, string(result))
}

func ReturnBraches(w http.ResponseWriter, r *http.Request){
    common.EnableCors(&w)

    vars := mux.Vars(r)
	
    repo := vars["repo"]
	owner:= vars["owner"]
	url := fmt.Sprintf("https://api.github.com/repos/%s/%s/branches", owner , repo )

	resp := common.GetFromGhApi(url)
    
    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
      log.Fatalln(err)
    }
   

    var branches  []Branch
    json.Unmarshal(body, &branches)

    result, _ :=  json.Marshal(branches)

    fmt.Fprintf(w, string(result))
}

func ReturnBrachesStandanrd(w http.ResponseWriter, r *http.Request){
    
    common.EnableCors(&w)

    vars := mux.Vars(r)

    standard := vars["standard"]
	
    repo := vars["repo"]
	owner:= vars["owner"]
	url := fmt.Sprintf("https://api.github.com/repos/%s/%s/branches", owner , repo )
    
    standard_is_valid := common.ValidateBranchStandard(standard)

    if  standard_is_valid == false {
        log.Fatalln("The commits standard is not supported")
        return;
    }
   
	resp := common.GetFromGhApi(url)

    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
      log.Fatalln(err)
    }

    var branches  []Branch
    json.Unmarshal(body, &branches)

    var branchRespect BranchRespect
    branchRespect.Standard = standard

    var initBranchState  BranchRespectState
    initBranchState = BranchRespectState{State: "Respecting", Count :0}
    branchRespect.BranchRespectState = append(branchRespect.BranchRespectState , initBranchState)
    initBranchState = BranchRespectState{State: "Not respecting", Count :0}
    branchRespect.BranchRespectState = append(branchRespect.BranchRespectState , initBranchState)

    for _ , branch := range branches{
        
        branchRespect.Total += 1
        if common.ValidateBranchName(branch.Name) {
            branchRespect.BranchRespectState[0].Count +=1
        }else{
            branchRespect.BranchRespectState[1].Count +=1
        }
    }

    result, _ :=  json.Marshal(branchRespect)
    
    fmt.Fprintf(w, string(result))
}


func ReturnBrancheProtection(w http.ResponseWriter, r *http.Request){
    common.EnableCors(&w)

    vars := mux.Vars(r)
	
    repo := vars["repo"]
	owner:= vars["owner"]
    branch := vars["branch"]
	url := fmt.Sprintf("https://api.github.com/repos/%s/%s/branches/%s/protection", owner , repo, branch )

	resp := common.GetFromGhApi(url)
    
    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
      log.Fatalln(err)
    }

    fmt.Println(string(body))

    var brancheProtection BranchProtection
    json.Unmarshal(body, &brancheProtection)

    fmt.Println(brancheProtection.RequiredPullRequestReviews)
    result, _ :=  json.Marshal(brancheProtection)

    fmt.Fprintf(w, string(result))
}

func ReturnRepoIssues(w http.ResponseWriter, r *http.Request){
    common.EnableCors(&w)

    vars := mux.Vars(r)
	
    repo := vars["repo"]
	owner:= vars["owner"]
	url := fmt.Sprintf("https://api.github.com/repos/%s/%s/issues", owner , repo )

	resp := common.GetFromGhApi(url)
    
    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
      log.Fatalln(err)
    }



    var issues []Issue
    json.Unmarshal(body, &issues)

    result, _ :=  json.Marshal(issues)
    
    fmt.Fprintf(w, string(result))
}

func ReturnPullRequests(w http.ResponseWriter, r *http.Request){
    common.EnableCors(&w)

    vars := mux.Vars(r)
	
    repo := vars["repo"]
	owner:= vars["owner"]
	url := fmt.Sprintf("https://api.github.com/repos/%s/%s/pulls", 
                owner , repo )

	resp := common.GetFromGhApi(url)
    
    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
      log.Fatalln(err)
    }

    var pullRequests []PullRequest
    json.Unmarshal(body, &pullRequests)

    result, _ :=  json.Marshal(pullRequests)
    
    fmt.Fprintf(w, string(result))
}

func ReturnCommitsStandanrd(w http.ResponseWriter, r *http.Request){
    common.EnableCors(&w)

    vars := mux.Vars(r)
	
    repo := vars["repo"]
	owner:= vars["owner"]
    standard := vars["standard"]
	url := fmt.Sprintf("https://api.github.com/repos/%s/%s/commits", owner , repo )

	resp := common.GetFromGhApi(url)
    
    standard_is_valid := common.ValidateCommitStandard(standard)

    if  standard_is_valid == false {
        log.Fatalln("The commits standard is not supported")
        return;
    }
    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
      log.Fatalln(err)
    }



    var commits []CommitGeneral
    json.Unmarshal(body, &commits)

    var commitRespect CommitRespect
    commitRespect.Standard = standard

    var initCommitState  CommitRespectState
    initCommitState = CommitRespectState{State: "Respecting", Count :0}
    commitRespect.CommitRespectState = append(commitRespect.CommitRespectState, initCommitState)
    initCommitState = CommitRespectState{State: "Not respecting", Count :0}
    commitRespect.CommitRespectState = append(commitRespect.CommitRespectState, initCommitState)

    for _ , commit := range commits{
        
        commitRespect.Total += 1
        if common.ValidateCommitMessage(commit.Commit.Message) {
            commitRespect.CommitRespectState[0].Count +=1
        }else{
            commitRespect.CommitRespectState[1].Count +=1
        }
    }

    result, _ :=  json.Marshal(commitRespect)
    
    fmt.Fprintf(w, string(result))
}

func ReturnTagsStandanrd(w http.ResponseWriter, r *http.Request){
    common.EnableCors(&w)

    vars := mux.Vars(r)
	
    repo := vars["repo"]
	owner:= vars["owner"]
    standard := vars["standard"]
	url := fmt.Sprintf("https://api.github.com/repos/%s/%s/git/refs/tags", owner , repo )

	resp := common.GetFromGhApi(url)
    
    standard_is_valid := common.ValidateTagStandard(standard)

    if  standard_is_valid == false {
        log.Fatalln("The tag standard is not supported")
        return;
    }
    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
      log.Fatalln(err)
    }

    var tags []Tag
    json.Unmarshal(body, &tags)

    var tagRespect TagRespect
    tagRespect.Standard = standard

    var initTagState TagRespectState
   
    for _ , tag := range tags{
        
        tagRespect.Total += 1
        tagText := strings.Split(tag.Ref, "/")[2]
        if common.VlidateTagName(tag.Ref) {
            initTagState = TagRespectState{State: "yes", Tag :tagText}
            tagRespect.TagRespectState = append(tagRespect.TagRespectState, initTagState)
           
        }else{
            initTagState = TagRespectState{State: "no", Tag :tagText}
            tagRespect.TagRespectState = append(tagRespect.TagRespectState, initTagState)
        }
    }

    result, _ :=  json.Marshal(tagRespect)
    
    fmt.Fprintf(w, string(result))
}

func ReturnContributors(w http.ResponseWriter, r *http.Request){
    common.EnableCors(&w)

    vars := mux.Vars(r)
	
    repo := vars["repo"]
	owner:= vars["owner"]
	url := fmt.Sprintf("https://api.github.com/repos/%s/%s/contributors", owner , repo )

	resp  :=  common.GetFromGhApi(url)
    
    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
      log.Fatalln(err)
    }

    var contributors  []GithubUser
    json.Unmarshal(body, &contributors)

    result, _ :=  json.Marshal(contributors)

    fmt.Fprintf(w, string(result))
}

func ReturnMerges(w http.ResponseWriter, r *http.Request){
    common.EnableCors(&w)

    vars := mux.Vars(r)
	
    repo := vars["repo"]
	owner:= vars["owner"]
	url := fmt.Sprintf("https://api.github.com/repos/%s/%s/commits", owner , repo )

	resp := common.GetFromGhApi(url)
	
    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
      log.Fatalln(err)
    }

    var commits []CommitGeneral
    json.Unmarshal(body, &commits)
   
    var commit_contains_merges_count int
    for _ , commit := range commits{
        if(len(commit.CommitParent) > 1){
            commit_contains_merges_count += 1
        }
    }
    
    fmt.Fprintf(w, `{"count" : %d}`,  commit_contains_merges_count )
}

func GithubCallback(w http.ResponseWriter, r *http.Request){
    common.EnableCors(&w)

    code := r.URL.Query().Get("code")

    clientID := common.GetGithubClientID()
    clientSecret := common.GetGithubClientSecret()


	url := fmt.Sprintf("https://github.com/login/oauth/access_token?client_id=%s&client_secret=%s&code=%s", clientID, clientSecret, code)
    
    
    resp := common.PostFromGhApi(url)
	
    body, err := ioutil.ReadAll(resp.Body)

    if err != nil {
      log.Fatalln(err)
    }

    var accesstoken OAuthAccessResponse
    json.Unmarshal(body, &accesstoken)

    result, _ :=  json.Marshal(accesstoken)
    
    fmt.Fprintf(w, string(result))
}