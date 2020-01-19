export interface NewsArray {
  created_at:       Date;
  title:            null | string;
  url:              null | string;
  author:           string;
  points:           number | null;
  story_text:       null | string;
  comment_text:     null | string;
  num_comments:     number | null;
  story_id:         number | null;
  story_title:      null | string;
  story_url:        null | string;
  parent_id:        number | null;
  created_at_i:     number;
  _tags:            string[];
  objectID:         string;
  isdeleted:        number;
}
