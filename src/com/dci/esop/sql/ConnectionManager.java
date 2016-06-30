package com.dci.esop.sql;

import java.sql.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import net.sf.ezmorph.bean.MorphDynaBean;
import net.sf.json.JSONNull;
import net.sf.json.JSONObject;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import com.dci.esop.util.Config;
import com.dci.esop.util.Util;


public class ConnectionManager {
	private DriverManagerDataSource driverManagerDataSource=null;
	private NamedParameterJdbcTemplate jdbcTemplate = null;
	private JdbcTemplate simpleJdbcTemplate =null;
	private DataSourceTransactionManager transactionManager=null;
	private DefaultTransactionDefinition transactionDefinition=null;
	private TransactionStatus transactionStatus=null;
	private boolean autoCommit=true;
	
	public boolean isAutoCommit() {
		return autoCommit;
	}

	public ConnectionManager() {
	}
	
	/**
	 * 為JdbcTemplate，將DriverManagerDataSource轉型為DataSource使用
	 * @return
	 */
	protected DataSource getDataSource() {
		return getDriverManagerDataSource() ;
	}
	/**
	 * 建立DataSource
	 * @return
	 */
	private DriverManagerDataSource getDriverManagerDataSource() {
		Config config = Config.getInstance();
		if(driverManagerDataSource==null){
			driverManagerDataSource=new DriverManagerDataSource();
			driverManagerDataSource.setDriverClassName(config.getConfig("DatabaseDriver"));
			driverManagerDataSource.setUrl(config.getConfig("DatabaseUrl").replace("[DatabaseIp]", config.getConfig("DatabaseIp")));
			driverManagerDataSource.setUsername(config.getConfig("DatabaseUsername"));
			driverManagerDataSource.setPassword(config.getConfig("DatabasePassword"));
		}
		return driverManagerDataSource;
	}
	/**
	 * 建立NamedParameterJdbcTemplate
	 * @return
	 */
	protected NamedParameterJdbcTemplate getJdbcTemplate() {
		if(jdbcTemplate==null){
			jdbcTemplate=new NamedParameterJdbcTemplate(getDataSource());
		}
		return jdbcTemplate;
	}
	/**
	 * 建立JdbcTemplate
	 * @return
	 */
	protected JdbcTemplate getSimpleJdbcTemplate() {
		if(simpleJdbcTemplate==null){
			simpleJdbcTemplate= new JdbcTemplate(getDataSource());
		}
		return simpleJdbcTemplate;
	}
	/**
	 * 建立DataSourceTransactionManager(交易安全元件)
	 * @return
	 */
	protected DataSourceTransactionManager getTransactionManager() {
		if(transactionManager==null){
			transactionManager=new DataSourceTransactionManager(getDataSource());
		}
		return transactionManager;
	}
	/**
	 * 建立DefaultTransactionDefinition(交易安全元件)
	 * @return
	 */
	protected DefaultTransactionDefinition getTransactionDefinition() {
		if(transactionDefinition==null){
			transactionDefinition=new DefaultTransactionDefinition();
		}
		return transactionDefinition;
	}
	/**
	 * 開關交易安全 
	 * @param AutoCommit(true/false)
	 */
	public void setAutoCommit(boolean AutoCommit) {
		transactionDefinition = new DefaultTransactionDefinition();
		if (!AutoCommit && isAutoCommit()) { 
			transactionDefinition.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		}else if(!isAutoCommit()){	
			transactionDefinition.setPropagationBehavior(TransactionDefinition.PROPAGATION_NEVER);
		}
		this.autoCommit=AutoCommit;
		setTransactionStatus(getTransactionManager().getTransaction(getTransactionDefinition()));
	}
	/**
	 * get交易安全狀態
	 * @return
	 */
	protected TransactionStatus getTransactionStatus() {
		return transactionStatus;
	}
	/**
	 * set交易安全狀態
	 * @return
	 */
	protected void setTransactionStatus(TransactionStatus transactionStatus) {
		this.transactionStatus = transactionStatus;
	}
	/**
	 * COMMIT交易安全
	 */
	public void transactionCommit() {
		getTransactionManager().commit(getTransactionStatus());
	}
	/**
	 * rollback交易安全
	 */
	public void transactionRollback() {
		if (isAutoCommit() == false && getTransactionManager() != null){
			getTransactionManager().rollback(getTransactionStatus());
		}
	}
	
	/**
	 * 查詢結果回傳成list
	 * @param sql sql語法
	 * @param obj 參數
	 * @return
	 */
	public List queryForList(String sql, Object obj) {
		List rows =null;
		if (obj == null){
			rows =getJdbcTemplate().queryForList(sql, (new HashMap()));
		}else{
			if(obj instanceof MapSqlParameterSource ){
				rows = getJdbcTemplate().queryForList(sql, (MapSqlParameterSource)obj);
			}else if(obj instanceof JSONObject){
				rows = getJdbcTemplate().queryForList(sql, Util.jsonObjParseMap((JSONObject)obj));
			}else if(obj instanceof Map ||obj instanceof HashMap ){
				rows = getJdbcTemplate().queryForList(sql, (Map)obj);
			}else{
				SqlParameterSource SqlParameterSource = new BeanPropertySqlParameterSource(obj);
				rows = getJdbcTemplate().queryForList(sql, SqlParameterSource);
			}
		}
		return rows;
	}
	/**
	 * 查詢結果回傳成單一數值
	 * @param sql sql語法
	 * @param obj 參數
	 * @return
	 */
	public int queryForSingleInteger(String sql, Object obj) {
		int data = -1;
		List rows = queryForList(sql, obj);
		if (rows.size() != 0){
			int i = 0;
			Iterator it = rows.iterator();
			if (it.hasNext()) {
				Map dataMap = (Map) it.next();
				Object[] keySet = dataMap.keySet().toArray();
				data = ((Integer) dataMap.get(keySet[0])).intValue();

			}
		}			
		return data;
	}
	/**
	 * 查詢結果回傳成單一字串
	 * @param sql sql語法
	 * @param obj 參數
	 * @return
	 */
	public String queryForSingleString(String sql, Object obj) {
		String data = "";
		List rows = queryForList(sql, obj);
		if (rows.size() == 0)
			data="";
		else {
			int i = 0;
			Iterator it = rows.iterator();
			if (it.hasNext()) {
				Map dataMap = (Map) it.next();
				Object[] keySet = dataMap.keySet().toArray();
				data = (String) dataMap.get(keySet[0]);
			}
		}
		if(data==null)data="";
		return data;
	}
	/**
	 * 執行更新語法
	 * @param sql sql語法
	 * @param obj 參數
	 * @return
	 */
	public int sqlUpdate(String sql, Object obj) {
		if(!sql.equals("")){
			
			if (obj == null){
				return getJdbcTemplate().update(sql, (new HashMap()));
			}else{
				if(obj instanceof MapSqlParameterSource ){
					return getJdbcTemplate().update(sql, (MapSqlParameterSource)obj);
				}else if(obj instanceof JSONObject ){
					return getJdbcTemplate().update(sql, Util.jsonObjParseMap((JSONObject)obj));
				}else if(obj instanceof Map ||obj instanceof HashMap ){
					return getJdbcTemplate().update(sql, (Map)obj);
				}else{
					SqlParameterSource SqlParameterSource = new BeanPropertySqlParameterSource(obj);
					return getJdbcTemplate().update(sql, SqlParameterSource);
				}
			}
		}else {
			return 0;
		}

	}
}
