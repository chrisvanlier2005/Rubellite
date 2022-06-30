<?php
class QueryValidator{
    /**
     * > This function takes a value, checks to see if it's an integer, and if it is, it returns the value. If it's not an
     * integer, it destroys the script execution.
     *
     * @param val the value to be converted to an integer
     *
     * @return the value of the variable $val after it has been converted to an integer and filtered.
     */
    public static function integer($val = 0){
        // if the value is not an integer, then die
        if(!is_numeric($val) || abs($val) != $val  ){
            echo "$val is not an integer, please enter an integer.";    // if the value is not an integer, then throw an error
            die();
        }
        // converting to an integer
        $val = (int)$val;
        // make sure the value is positive
        $val = abs($val);
        // filter the value to be an integer
        return filter_var($val, FILTER_SANITIZE_NUMBER_INT);
    }

    // function that removes all characters that are not letters or numbers from a string
    public static function string($val = ''){
        return filter_var($val, FILTER_SANITIZE_STRING);
    }
}

class Query {
    public $query = [];

    public function select($columns, $table){
        $this->query['select'] = "SELECT $columns FROM $table";
        return $this;
    }
    public function where($column, $operator, $value){
        $this->query['where'] = "WHERE $column $operator '$value'";
        return $this;
    }
    public function orderBy($column, $order){
        $this->query['orderBy'] = "ORDER BY $column $order";
        return $this;
    }
    public function limit($limit){
        $this->query['limit'] = "LIMIT $limit";
        return $this;
    }
    public function offset($offset){
        $this->query['offset'] = "OFFSET $offset";
        return $this;
    }
    public function get(){
        return implode(' ',$this->query);
    }

}
