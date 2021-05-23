package common
	
import (
    "regexp"
)

func getIgnored() string {
	ignored := "^WIP%:"

	return ignored
}

func getCommitPattern() string{
	const pattern = `\A(Initial commit)|(Merge [^\r\n]+)|((build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test)(\(\w+\))?(!)?: [^\r\n]+((\r|\n|\r\n)((\r|\n|\r\n)[^\r\n]+)+)*)\z`

	return pattern
}

func getBranchPattern() string{
	
	const pattern = `^(feature|fix)\/(([a-z,A-Z]+))(-)(\d*)(:)([a-z,0–9])`

	return pattern
}

func getSemanticVersionPattern() string {
	const pattern = `v?([0-9]+)(\.[0-9]+)?(\.[0-9]+)?` +
	`(-([0-9A-Za-z\-]+(\.[0-9A-Za-z\-]+)*))?` +
	`(\+([0-9A-Za-z\-]+(\.[0-9A-Za-z\-]+)*))?`

	return pattern
}

func ValidateCommitMessage(str string) bool {
	pattern := getCommitPattern()
	re := regexp.MustCompile(pattern)

	return re.Match([]byte(str))
}

func ValidateCommitStandard(standard string) bool{
	standards := [2]string { "conventional-commits", "tbaggery"}

	for _, array_standard := range standards {
		if ( standard == array_standard ){
			return true
		}
	}

	return false

}



func ValidateBranchStandard(standard string) bool{
	standards := [1]string {"gitlab" }

	for _, array_standard := range standards {
		if ( standard == array_standard ){
			return true
		}
	}

	return false

}

func ValidateBranchName(str string) bool {
	pattern := getBranchPattern()
	re := regexp.MustCompile(pattern)

	return re.Match([]byte(str))
}


func ValidateTagStandard(standard string) bool{
	standards := [3]string {"semantic-versioning", "eclipse-bundle-versioning", "date-based-versioning" }

	for _, array_standard := range standards {
		if ( standard == array_standard ){
			return true
		}
	}

	return false

}

func VlidateTagName(str string ) bool {
	pattern := getSemanticVersionPattern()
	re := regexp.MustCompile(pattern)

	return re.Match([]byte(str))
}



