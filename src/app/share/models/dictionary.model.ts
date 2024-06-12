export interface Dictionary<Key, Value> {
    data: DictionaryData<Key, Value>[];
}

export interface DictionaryData<Key, Value> {
    key: Key;
    value: Value;
}