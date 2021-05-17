package planing
import "apiDevHelper/common"
type PlaningQuestions struct {
	Needs common.ConvertibleBoolean `json:"needs" validate:"required"`
	MarketResearch   common.ConvertibleBoolean `json:"research" validate:"required"`
	Goals  common.ConvertibleBoolean `json:"goals" validate:"required"`
	Time  common.ConvertibleBoolean `json:"time" validate:"required"`
	TaskBoard  common.ConvertibleBoolean `json:"board" validate:"required"`
}