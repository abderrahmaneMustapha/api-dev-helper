package  github


type Repository struct {
	FullName string `json:"full_name"`
	AvatarUrl string `json:"avatar_url"`
	ForksCount int `json:"forks_count"`
	StargazersCount int `json:"stargazers_count"`
	WatchersCount int `json:"watchers_count"`
	OpenIssuesCount int `json:"open_issues_count"`
	DefaultBranch string `json:"default_branch"`	
    /*CommitsCounts string `json:"commits_count"`
    PullRequestCounts string  `json:"pull_request_count"`
	ContributorsCounts string `json:"contributors_count"`
	MergesCounts string `json:"merges_counts"`
	Issues string `json:"issues"`*/
}

type Organization struct {

}

type Branch struct {
	Name string `json:"name"`
	Protected *bool `json:"protected"`
}

type BranchProtection struct {
	Url string `json:"url"`
	RequiredPullRequestReviews RequiredPullRequestReviews `json:"required_pull_request_reviews"`
}

type BranchRespect struct {
	Standard string `json:"standard"`
	BranchRespectState []BranchRespectState `json:"branch_standard"`
	Total int `json:"total"`
}

type BranchRespectState struct {
	State string `json:"state"`
	Count int `json:"count"`
}

type RequiredPullRequestReviews struct {
  RequireCodeOwnerReviews *bool `json:"require_code_owner_reviews"`
  RequiredApprovingReviewCount  int `json:"required_approving_review_count"`
}

type GithubUser struct {
	Login string `json:"login"`
	AvatarUrl string `json:"avatar_url"`
	Url string `json:"url"`
	HtmlUrl string `json:"html_url"`
}

type Issue struct {
	Url string `json:"url"`
	HtmlUrl string `json:"html_url"`
	State string  `json:"state"`
    Title string `json:"title"`
    Body string `json:"body"`
	User GithubUser `json:"user"`
	ClosedAt string `json:"closed_at"`
    CreatedAt string `json:"created_at"`
    UpdatedAt string `json:"updated_at"`
}


type PullRequest struct {
	Url string `json:"url"`
	HtmlUrl string `json:"html_url"`
	State string  `json:"state"`
    Title string `json:"title"`
    Body string `json:"body"`
	User GithubUser `json:"user"`
	ClosedAt string `json:"closed_at"`
    CreatedAt string `json:"created_at"`
    UpdatedAt string `json:"updated_at"`
}

type OAuthAccessResponse struct {
	AccessToken string `json:"access_token"`
}
type CommitGeneral struct {
	Author GithubUser `json:"author"`
	HtmlUrl string `json:"html_url"`
	Url string `json:"url"`
	Commit Commit `json:"commit"`
	CommitParent []CommitParent `json:"parents"`
}


type Commit struct {
   CommentCount int `json:"comment_count"`
   Committer Committer `json:"committer"`
   Message string `json:"message"`
}


type CommitParent struct {
	Url string `json:"url"`
	Sha string `json:"sha"`
}
type Committer struct {
	Name string `json:"name"`
	Email string `json:"email"`
	Date string `json:"date"`
}

type CommitRespect struct {
	Standard string `json:"standard"`
	CommitRespectState []CommitRespectState `json:"commit_standard"`
	Total int `json:"total"`
}

type CommitRespectState struct {
	State string `json:"state"`
	Count int `json:"count"`
}

type TagRespect struct {
	Standard string `json:"standard"`
	TagRespectState []TagRespectState `json:"tag_standard"`
	Total int `json:"total"`
}

type TagRespectState struct {
	State string `json:"state"`
	Tag string `json:"tag"`
	By Tagger `json:"by"`
}

type Tag struct {
	Ref string `json:"ref"`
	Message string `json:"message"`
	Tagger Tagger `json:"tagger"`
}

type Tagger struct {
	Name  string `json:"name"`
	Email string `json:"email"`
	Date  string `json:"date"`
}
