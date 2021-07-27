package com.example.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;

@Entity
@Table(name = "contract_task")
public class ContractTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    //договор
    @Column(name = "contract_id")
    private String contractId;

    //крайнии срок исполнения
    @Column(name = "end_date")
    private Date endDate;

    //название задачи
    @Column(name = "name")
    private String taskName;

    //статус задачи
    @Column(name = "task_status")
    private String taskStatus;

    //описание задачи
    @Column(name = "about")
    private String aboutTask;

    //Коментарий
    @OneToMany(mappedBy = "task")
    private List<TaskComment> taskComments;

    public ContractTask() {
    }

    public ContractTask(Long id, String contractId, Date endDate, String taskName, String taskStatus, String aboutTask, List<TaskComment> taskComments) {
        this.id = id;
        this.contractId = contractId;
        this.endDate = endDate;
        this.taskName = taskName;
        this.taskStatus = taskStatus;
        this.aboutTask = aboutTask;
        this.taskComments = taskComments;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContractId() {
        return contractId;
    }

    public void setContractId(String contractId) {
        this.contractId = contractId;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public String getTaskStatus() {
        return taskStatus;
    }

    public void setTaskStatus(String taskStatus) {
        this.taskStatus = taskStatus;
    }

    public String getAboutTask() {
        return aboutTask;
    }

    public void setAboutTask(String aboutTask) {
        this.aboutTask = aboutTask;
    }

    public List<TaskComment> getTaskComments() {
        return taskComments;
    }

    public void setTaskComments(List<TaskComment> taskComments) {
        this.taskComments = taskComments;
    }
}