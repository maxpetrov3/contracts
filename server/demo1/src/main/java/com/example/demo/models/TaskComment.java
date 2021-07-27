package com.example.demo.models;

import javax.persistence.*;


@Entity
@Table(name = "task_comment")
public class TaskComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "comment")
    private String comment;

    @Column(name = "comment_date")
    private String commentDate;


    @Column(name = "task_id")
    private Long task;

    @ManyToOne
    @JoinColumn(name = "autor")
    private User executor;

    public TaskComment() {

    }

    public TaskComment(Long id, String comment, String commentDate, Long task, User executor) {
        this.id = id;
        this.comment = comment;
        this.commentDate = commentDate;
        this.task = task;
        this.executor = executor;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getCommentDate() {
        return commentDate;
    }

    public void setCommentDate(String commentDate) {
        this.commentDate = commentDate;
    }

    public Long getTask() {
        return task;
    }

    public void setTask(Long task) {
        this.task = task;
    }

    public User getExecutor() {
        return executor;
    }

    public void setExecutor(User executor) {
        this.executor = executor;
    }

    @Override
    public String toString() {
        return "TaskComment{" +
                "id=" + id +
                ", comment='" + comment + '\'' +
                ", commentDate='" + commentDate + '\'' +
                ", task=" + task +
                ", executor=" + executor +
                '}';
    }
}