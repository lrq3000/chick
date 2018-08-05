module OptionModel exposing (..)

import Http
import BackGroundModel exposing (ApiResponseItem)
import Model exposing (Score)
import PopupModel exposing (IndexStatus)


type Msg
    = NoOp
    | EditBlockKeyword String
    | DeleteBlockKeyword String
    | AddBlockList
    | ChangeViewOption String
    | ChangeIndexTarget String
    | Save
    | Reindexing
    | DeleteIndex
    | ImportPocket
    | EditPosition String String
    | SelectText String
    | EditApiUrl Api String
    | VerifyScrapingApi
    | VerifyQueryParseApi
    | VerifyScoringApi
    | ResponseScrapingApi (Result Http.Error (List ApiResponseItem))
    | ResponseQueryParseApi (Result Http.Error (List String))
    | ResponseScoringApi (Result Http.Error (List Score))
    | UpdateStatus IndexStatus


type Api
    = Scraping
    | QueryParse
    | Scoring


type alias Model =
    { position : Position
    , viewOption : ViewOption
    , blockList : List String
    , blockKeyword : String
    , indexTarget : IndexTarget
    , advancedOption : Advanced
    , changed : Bool
    , isIndexing : Bool
    , status : IndexStatus
    }


type alias Position =
    { top : Int
    , right : Int
    }


type alias Advanced =
    { scrapingApi : ApiStatus
    , queryParseApi : ApiStatus
    , scoringApi : ApiStatus
    }


type alias ApiStatus =
    { verify : Bool
    , url : String
    }


type alias ViewOption =
    { google : Bool
    , bing : Bool
    , duckDuckGo : Bool
    , yahoo : Bool
    }


type alias IndexTarget =
    { bookmark : Bool
    , history : Bool
    }
