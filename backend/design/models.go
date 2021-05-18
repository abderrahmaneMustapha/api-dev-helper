package design

type DesignQuestions struct {
	ApiAvailableFor string `json:"api-available-for" validate:"required"`
	ApiMainProduct string `json:"api-main-product" validate:"required"`
	ApiDx   string `json:"api-dx" validate:"required"`	
	Communication  string `json:"communication" validate:"required"`
	Technology string `json:"technology" validate:"required"`
	OpenClosed string `json:"open-closed" validate:"required"`
}

type DesignQuestionsData struct {
	Key string `json:"key"`
	Question string `json:"question"`
	Choices []DesignQuestionsDataChoices `json:"choices"`
}

type DesignQuestionsDataChoices struct {
	Choice string `json:"choice"`
	Score  int `json:"score"`
}