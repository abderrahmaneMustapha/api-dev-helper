package common

import (
	"os"
)

func GetGithubClientID() string {

	path := "../backend/.env"
	openEnvFile(path)
    githubClientID := os.Getenv("ClientId")
   
    return githubClientID
}

func GetGithubClientSecret() string {
	path := "../backend/.env"
	openEnvFile(path)

    githubClientSecret := os.Getenv("ClientSecret")
    
    return githubClientSecret
}

