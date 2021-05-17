package planing
import "apiDevHelper/common"
type PlaningQuestions struct {
	Needs *common.ConvertibleBoolean `json:"needs"`
	MarketResearch   *common.ConvertibleBoolean `json:"research"`
	Goals  *common.ConvertibleBoolean `json:"goals"`
	Time  *common.ConvertibleBoolean `json:"time"`
	TaskBoard  *common.ConvertibleBoolean `json:"board"`
}