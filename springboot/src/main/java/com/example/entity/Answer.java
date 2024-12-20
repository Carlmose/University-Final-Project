package com.example.entity;

import java.io.Serializable;

/**
 * 回答信息
 */
public class Answer implements Serializable {
    private static final long serialVersionUID = 1L;

    /** ID */
    private Integer id;
    /** 问题id */
    private Integer questionId;
    /** 回答内容 */
    private String content;
    /** 回答人ID */
    private Integer userId;
    /** 回答时间 */
    private String time;
    /** 点赞数 **/
    private Integer likesCount;
    private String status;
    /** 关联查询*/
    private String userAvatar;
    private String questionTitle;
    private String userName;

    public Integer getlikesCount() {
        return likesCount;
    }

    public void setlikesCount(Integer likesCount) {
        this.likesCount = likesCount;
    }
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getQuestionTitle() {
        return questionTitle;
    }

    public void setQuestionTitle(String questionTitle) {
        this.questionTitle = questionTitle;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Integer questionId) {
        this.questionId = questionId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getUserAvatar() {
        return userAvatar;
    }

    public void setUserAvatar(String userAvatar) {
        this.userAvatar = userAvatar;
    }
}