package common
import (
    "net/http"
	"os"
	"log"
	"github.com/joho/godotenv"
)
func EnableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func openEnvFile(path string){
	
	err := godotenv.Load(path)

  if err != nil {
    log.Fatalf("Error loading .env file")
  }
}
func GetFromGhApi(url string) (*http.Response) {
	log.Println(url)

	req, err :=  http.NewRequest("GET",url, nil)

	if err != nil {
        log.Println("Error on request.\n[ERROR] -", err)
    }

	path := "../backend/.env"
	openEnvFile(path)
	auth_token := os.Getenv("Authorization")


	req.Header.Add("Authorization", `token `+auth_token)

	client := &http.Client{}
   
	resp, err := client.Do(req)
	

    if err != nil {
        log.Println("Error on response.\n[ERROR] -", err)
    }
	return resp
}