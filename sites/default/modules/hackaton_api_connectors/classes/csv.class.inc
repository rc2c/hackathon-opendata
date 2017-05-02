<?php

//class APIConnector_larochelle extends APIConnector
class APIConnector_csv
{
	public $csvFileName;
	public $csvDatas;

	/**
	 * 
	 */
	public function __construct($fileName = 'budget_depense3.csv', $parseHeader = false, $delimiter = "\t")
	{
		global $base_url;
		$this->csvFileName = $fileName;
		$this->csvDatas = array(
			'csvFileUri' => $base_url . '/' . path_to_theme() . '/__uploads/' . $fileName,
			'parseHeader' => $parseHeader,
			'delimiter' => $delimiter
		);
	}



	public function getBases()
	{
		return array($this->csvFileName);
	}

	public function getTables($database)
	{
		return array($database);
	}

	public function getColumnsName($database, $table)
	{
		$results = array();
		if ($content = fopen($this->csvDatas['csvFileUri'], 'r')) {
			$results = fgetcsv($content);
		}
		return $results;
	}

	public function getValues($database, $table, $columns)
	{
		$results = array();

		if (!empty($columns) && $content = fopen($this->csvDatas['csvFileUri'], 'r')) {

			$isHeader = true;
			$columnsIndexes = array();

			while ($row = fgetcsv($content)) {

				/*if ($isHeader) {

				}

				$resultsTmp = array();
				foreach ($columns as $column) {
					$resultsTmp[$column] = $row[$column];
				}
				$results[] = $resultsTmp;*/
				$results[] = $row;
			}
		}
		return $results;
	}

}


