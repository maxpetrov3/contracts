package com.example.demo.models;

import javax.persistence.*;
import java.util.List;


@Entity
@Table(name = "contracts")
public class Contract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    // Номер договора
    @Column(name = "contract_id")
    private String contractId;

    // Направление деятельности
    @ManyToOne
    @JoinColumn(name = "direction_id")
    private ActivityDirection directionId;

    //идентификатор дополнительного соглашения
    @Column(name = "ds_id")
    private String dsId;

    //юредический номер документа
    @Column(name = "ur_id")
    private String urId;

    //статус договора
    @ManyToOne
    @JoinColumn(name = "contract_status")
    private ContractStatus contractStatus;

    //Исполнитель договора
    @ManyToOne
    @JoinColumn(name = "executor")
    private User executor;

    //Дата документа
    @Column(name = "contract_date")
    private String contractDate;

    //Котрагент
    @ManyToOne
    @JoinColumn(name = "contragent")
    private Contragent contragent;

    //дата вступланеия в силу договора
    @Column(name = "begin_contract_date")
    private String beginContractDate;

    //дата окончания договора
    @Column(name = "end_contract_date")
    private String endContractDate;

    //полное описание договора
    @Column(name = "about_contract")
    private String aboutContract;

    //краткое описание договора
    @Column(name = "about_contract_short")
    private String aboutContractShort;

    //стоимость договора
    @Column(name = "contract_price")
    private Long contractPrice;

    //валюта
    @ManyToOne
    @JoinColumn(name = "currency")
    private Currency currency;

    //список  условия платежа
    @ManyToMany
    @JoinTable(name = "contract_pay_rules",
    joinColumns = @JoinColumn(name = "contract_id"),
    inverseJoinColumns = @JoinColumn(name = "pay_rule_id"))
    private List<PayRule> payRules;

    // финансовая позиция
    @ManyToMany
    @JoinTable(name = "contract_fm_positions",
    joinColumns = @JoinColumn(name = "contract_id"),
    inverseJoinColumns = @JoinColumn(name = "fm_position"))
    private List<FmPosition> fmPositions;

    //кредитор
    @ManyToOne
    @JoinColumn(name = "kreditor")
    private Kreditor kreditor;

    //тедер
    @ManyToOne
    @JoinColumn(name = "tender")
    private Tender tender;

    //перечень видов расходов
    @ManyToMany
    @JoinTable(name = "contract_costs_type",
    joinColumns = @JoinColumn(name = "contract_id"),
    inverseJoinColumns = @JoinColumn(name = "cost_type_id"))
    private List<CostType> costsTypes;

    //протокол разногласий
    @ManyToOne
    @JoinColumn(name = "dis_protocol")
    private DisProtocol disProtocol;

    //перенос срока платежа
    @ManyToOne
    @JoinColumn(name = "pay_skip")
    private PostPay postPay;

    @Column(name = "invest_project")
    private String investProject;

    @Column(name = "rks")
    private String  rks;

    public Contract(long id, String contractId, ActivityDirection directionId, String dsId, String urId, ContractStatus contractStatus, User executor, String contractDate, Contragent contragent, String beginContractDate, String endContractDate, String aboutContract, String aboutContractShort, Long contractPrice, Currency currency, List<PayRule> payRules, List<FmPosition> fmPositions, Kreditor kreditor, Tender tender, List<CostType> costsTypes, DisProtocol disProtocol, PostPay postPay, String investProject, String rks) {
        this.id = id;
        this.contractId = contractId;
        this.directionId = directionId;
        this.dsId = dsId;
        this.urId = urId;
        this.contractStatus = contractStatus;
        this.executor = executor;
        this.contractDate = contractDate;
        this.contragent = contragent;
        this.beginContractDate = beginContractDate;
        this.endContractDate = endContractDate;
        this.aboutContract = aboutContract;
        this.aboutContractShort = aboutContractShort;
        this.contractPrice = contractPrice;
        this.currency = currency;
        this.payRules = payRules;
        this.fmPositions = fmPositions;
        this.kreditor = kreditor;
        this.tender = tender;
        this.costsTypes = costsTypes;
        this.disProtocol = disProtocol;
        this.postPay = postPay;
        this.investProject = investProject;
        this.rks = rks;
    }

    public Contract() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getContractId() {
        return contractId;
    }

    public void setContractId(String contractId) {
        this.contractId = contractId;
    }

    public ActivityDirection getDirectionId() {
        return directionId;
    }

    public void setDirectionId(ActivityDirection directionId) {
        this.directionId = directionId;
    }

    public String isDsId() {
        return dsId;
    }

    public void setDsId(String dsId) {
        this.dsId = dsId;
    }

    public String getUrId() {
        return urId;
    }

    public void setUrId(String urId) {
        this.urId = urId;
    }

    public ContractStatus getContractStatus() {
        return contractStatus;
    }

    public void setContractStatus(ContractStatus contractStatus) {
        this.contractStatus = contractStatus;
    }

    public User getExecutor() {
        return executor;
    }

    public void setExecutor(User executor) {
        this.executor = executor;
    }

    public String getContractDate() {
        return contractDate;
    }

    public void setContractDate(String contractDate) {
        this.contractDate = contractDate;
    }

    public Contragent getContragent() {
        return contragent;
    }

    public void setContragent(Contragent contragent) {
        this.contragent = contragent;
    }

    public String getBeginContractDate() {
        return beginContractDate;
    }

    public void setBeginContractDate(String beginContractDate) {
        this.beginContractDate = beginContractDate;
    }

    public String getEndContractDate() {
        return endContractDate;
    }

    public void setEndContractDate(String endContractDate) {
        this.endContractDate = endContractDate;
    }

    public String getAboutContract() {
        return aboutContract;
    }

    public void setAboutContract(String aboutContract) {
        this.aboutContract = aboutContract;
    }

    public String getAboutContractShort() {
        return aboutContractShort;
    }

    public void setAboutContractShort(String aboutContractShort) {
        this.aboutContractShort = aboutContractShort;
    }

    public Long getContractPrice() {
        return contractPrice;
    }

    public void setContractPrice(Long contractPrice) {
        this.contractPrice = contractPrice;
    }

    public Currency getCurrency() {
        return currency;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public List<PayRule> getPayRules() {
        return payRules;
    }

    public void setPayRules(List<PayRule> payRules) {
        this.payRules = payRules;
    }

    public List<FmPosition> getFmPositions() {
        return fmPositions;
    }

    public void setFmPositions(List<FmPosition> fmPositions) {
        this.fmPositions = fmPositions;
    }

    public Kreditor getKreditor() {
        return kreditor;
    }

    public void setKreditor(Kreditor kreditor) {
        this.kreditor = kreditor;
    }

    public Tender getTender() {
        return tender;
    }

    public void setTender(Tender tender) {
        this.tender = tender;
    }

    public List<CostType> getCostsTypes() {
        return costsTypes;
    }

    public void setCostsTypes(List<CostType> costsTypes) {
        this.costsTypes = costsTypes;
    }

    public DisProtocol getDisProtocol() {
        return disProtocol;
    }

    public void setDisProtocol(DisProtocol disProtocol) {
        this.disProtocol = disProtocol;
    }

    public PostPay getPostPay() {
        return postPay;
    }

    public void setPostPay(PostPay postPay) {
        this.postPay = postPay;
    }

    public String getInvestProject() {
        return investProject;
    }

    public void setInvestProject(String investProject) {
        this.investProject = investProject;
    }

    public String getRks() {
        return rks;
    }

    public void setRks(String rks) {
        this.rks = rks;
    }

    @Override
    public String toString() {
        return "Contract{" +
                "id=" + id +
                ", contractId='" + contractId + '\'' +
                ", directionId=" + directionId +
                ", dsId='" + dsId + '\'' +
                ", urId='" + urId + '\'' +
                ", contractStatus=" + contractStatus +
                ", executor=" + executor +
                ", contractDate='" + contractDate + '\'' +
                ", contragent=" + contragent +
                ", beginContractDate='" + beginContractDate + '\'' +
                ", endContractDate='" + endContractDate + '\'' +
                ", aboutContract='" + aboutContract + '\'' +
                ", aboutContractShort='" + aboutContractShort + '\'' +
                ", contractPrice=" + contractPrice +
                ", currency=" + currency +
                ", payRules=" + payRules +
                ", fmPositions=" + fmPositions +
                ", kreditor=" + kreditor +
                ", tender=" + tender +
                ", costsTypes=" + costsTypes +
                ", disProtocol=" + disProtocol +
                ", postPay=" + postPay +
                ", investProject='" + investProject + '\'' +
                ", rks='" + rks + '\'' +
                '}';
    }
}