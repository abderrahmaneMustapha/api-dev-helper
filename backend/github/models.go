package  github


type Repository struct {
	FullName string `json:"full_name"`
	AvatarUrl string `json:"avatar_url"`
    /*CommitsCounts string `json:"commits_count"`
    PullRequestCounts string  `json:"pull_request_count"`
	ContributorsCounts string `json:"contributors_count"`
	MergesCounts string `json:"merges_counts"`
	Issues string `json:"issues"`*/
}