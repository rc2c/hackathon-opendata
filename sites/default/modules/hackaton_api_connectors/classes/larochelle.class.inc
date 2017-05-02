<?php

//class APIConnector_larochelle extends APIConnector
class APIConnector_larochelle
{

	private $apiParameters;
	public $responseFormat;

	/**
	 * 
	 */
	public function __construct($apiKey = 'w0GH20O1uLPiHS9z', $responseFormat = 'xml')
	{
		$this->apiParameters = array(
			'key' => $apiKey,
			'format' => $responseFormat
		);
		$this->responseFormat = $responseFormat;
		$this->apiUrl = 'http://www.opendata.larochelle.fr/webservice/';
	}

	/**
	 * 
	 */
	public function constructUrl($parameters)
	{
		$queryParameters = array_merge($this->apiParameters, $parameters);
		return $this->apiUrl . '?' . http_build_query($queryParameters);
	}

	/**
	 * @todo try / catch
	 */
	public function getUrlResults($url)
	{
		$xmlUrl = $url . '&' . http_build_query(array('format' => $this->responseFormat));

		if ($content = file_get_contents($xmlUrl)) {
			if ($xmlDatas = simplexml_load_string($content)) {
				return $xmlDatas->answer->data;
			}
		}

		return null;
	}

	public function initRequest($type, $parameters = array())
	{

		switch ($type) {
			case 'databases':
				$parameters['service'] = 'getBases';
				break;
			case 'tables':
				$parameters['service'] = 'getTables';
				break;
			case 'values':
				$parameters['service'] = 'getData';
				break;
			
			default:
				# code...
				break;
		}

		$url = $this->constructUrl($parameters);
		return $this->getUrlResults($url);
	}




	public function getBases()
	{
		$results = array();
		if ($datas = $this->initRequest('databases')) {
			$bases = $datas->db;
			foreach ($bases as $data) {
				$results[] = array_values((array)$data)[0];
			}
		}
		return $results;
	}

	public function getTables($database)
	{
		$results = array();
		if ($datas = $this->initRequest('tables', array('db' => $database))) {
			$tables = (array)$datas->table;
			foreach ($tables as $data) {
				$results[] = $data;
			}
		}
		return $results;
	}

	public function getColumnsName($database, $table)
	{
		$results = array();
		if ($datas = $this->initRequest('values', array('db' => $database, 'table' => $table))) {
			$values = $datas->row;
			$results = array_keys((array)$values[0]);
		}
		return $results;
	}

	public function getValues($database, $table, $columns)
	{
		$results = array();

		if (!empty($columns) && $datas = $this->initRequest('values', array('db' => $database, 'table' => $table))) {
			$values = $datas->row;
			foreach ($values as $data) {
				$dataAsArray = (array)$data;
				$resultsTmp = array();
				foreach ($columns as $column) {
					$resultsTmp[$column] = trim($dataAsArray[$column], '"');
				}
				$results[] = $resultsTmp;
			}
		}
		return $results;
	}

}


