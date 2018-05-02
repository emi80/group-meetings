---
title: "GA4GH"
date: "2017-02-01"
aliases: "/3"
---

# Introduction


## Mission
<!-- .element: style="margin-bottom: 0.6em;"-->

<!-- panel->(blue) -->
Accelerate progress in human health by helping to establish a common framework of harmonized approaches to enable effective and responsible sharing of genomic and clinical data, and by catalyzing data sharing projects that drive and demonstrate the value of data sharing

<!-- .element: class="footer"-->
http://genomicsandhealth.org/


## Organization

![](http://genomicsandhealth.org/files/Global-Alliance-how-we-work-v2.jpg)<!-- .element: style="width: 70%; box-shadow: none;margin-bottom: 0em;"-->


## Working Groups
<!-- .element: style="margin-bottom: 1em;"-->

- Clinical Working Group <!-- .element: style="margin-bottom: 0.5em;"-->
- Data Working Group <!-- .element: style="margin-bottom: 0.5em;"-->
- Regulatory and Ethics Working Group <!-- .element: style="margin-bottom: 0.5em;"-->
- Security Working Group

------

# Data Working Group
<!-- .element: style="margin-bottom: 0.5em;"-->

http://ga4gh.org/


## Objective
<!-- .element: style="margin-bottom: 1em;"-->

<!-- panel->(blue) -->
create global standards and tools for the secure, privacy respecting and interoperable sharing of Genomic data


## Genomics API

![](http://ga4gh.org/assets/images/documentation/GA4GH_API_interop.png)<!-- .element: style="width: 80%; box-shadow: none;margin-bottom: 0em;"-->

<!-- .element: class="footer" style="bottom:-10%; left: 10%;"-->
[GA4GH Documentation](http://ga4gh.org/#/documentation)


## Use cases
<!-- .element: style="margin-bottom: 1em;"-->

- Enabling Genomics-Based Patient Risk Assessment: BRCA1 Information Consolidation and Interpretation <!-- .element: style="margin-bottom: 0.5em;"-->
- Combining Genomes Across Sites enabling Research for Cancer and Rare/Undiagnosed Diseases <!-- .element: style="margin-bottom: 0.5em;"-->
- Identifying Microorganisms <!-- .element: style="margin-bottom: 0.5em;"-->
- Predicting Drug Response and Integration with Electronic Medical Records for Research <!-- .element: style="margin-bottom: 0.5em;"-->
- Prenatal Testing


## Working Task Teams
<!-- .element: style="margin-bottom: 1em;"-->

- Benchmarking
- Containers and Workflows
- File Formats
- Metadata
- Reference Genomes
- RNA and Gene Expression <!-- .element: class="blue"-->
- Variant Annotation
- Reads <!-- .element: class="green" style="margin-top: 0.5em;"-->
- Genotype to phenotype <!-- .element: class="green"-->


## RNAseq Task Team
<!-- .element: style="margin-bottom: 1em;"-->

<!-- panel->(blue) -->
The RNA and Gene Expression Task Team provides APIs to interoperably store, process, explore, and share RNA sequence reads, computed transcript structures, and their expression levels.

<!-- .element: class="footer" -->
http://ga4gh.org/#/rnaseq-team

------

# Genomics API


## Interoperability
<!-- .element: style="margin-bottom: 1em;"-->

<!-- panel->(blue) -->
<!-- .element: style="margin-bottom: 2em;"-->
interoperable exchange of genomic information across multiple organizations and on multiple platforms

- open standard for interoperability, that uses common web protocols to support serving and sharing of data <!-- .element: style="margin-bottom: 1em;"-->
- webservice to create a data source which may be integrated into
  - visualization software <!-- .element: style="margin-top: 0.2em;"-->
  - web-based genomics portals
  - genomic analysis pipelines


## API Goals
<!-- .element: style="margin-bottom: 1em;"-->

- allow flexibility in server implementation (e.g. persistence backend, language, authorization model, scale) <!-- .element: style="margin-bottom: 0.5em;"-->
- allow full-fidelity representation of data <!-- .element: style="margin-bottom: 0.5em;"-->
- allow adding more structure to data (e.g. formal provenance, versioning) <!-- .element: style="margin-bottom: 0.5em;"-->
- allow data owners to organize their data in ways that make sense to them

<!-- panel->(blue) -->
<!-- .element: style="margin-top: 1.2em;"-->
At the same time, the API should encourage reusable organization, anticipating a future that supports cross-researcher and cross-repository data federation


## Web API
<!-- .element: style="margin-bottom: 1em;"-->

<!-- panel->(blue) -->
A server-side web API is a programmatic interface consisting of one or more publicly exposed endpoints to a defined request-response message system, typically expressed in `JSON` or `XML`, which is exposed via the web - most commonly by means of an `HTTP`-based web server

<!-- .element: class="footer" -->
[Wikipedia](https://en.wikipedia.org/wiki/Web_API)


## Schemas
<!-- .element: style="margin-bottom: 1em;"-->

<!-- panel->(blue) -->
The API consists of a series of schemas that define the types of things that API clients and servers exchange: requests for data, server responses, error messages, and objects actually representing pieces of genomics data

<!-- panel -->
<!-- .element: style="margin-top: 1em;"-->
On the wire, the GA4GH web API takes the form of a client and a server exchanging `JSON`-serialized objects over `HTTP` or `HTTPS`


## RNA Quantification API
<!-- .element: style="margin-bottom: 1em;"-->

<!-- panel->(blue) -->
provides a means of obtaining feature level quantifications derived from a set of RNA reads


## RNA Quantification Schema
<!-- .element: style="margin-bottom: 1em;"-->

<!-- panel->(blue) -->
The RNA Quantification Schema is designed around a quantification analysis. Each set of feature quantifications describes the results of running an analysis on a set of input data


## RnaQuantificationSet 
<!-- .element: style="margin-bottom: 1em;"-->

<!-- panel->(blue) -->
collects a group of related `RnaQuantifications`

<!-- panel -->
<!-- .element: style="margin-top: 2em;"-->
__E.g.__: a time course experiment would be described by a `RnaQuantificationSet` with the individual RNASeq experiments of the time point being represented as the member `RnaQuantifications`

<!-- .element: class="footer" style="bottom: -25.6%;" -->
[schema](https://ga4gh-schemas.readthedocs.io/en/latest/schemas/rna_quantification.proto.html#protobuf.RnaQuantificationSet)


## RnaQuantification 
<!-- .element: style="margin-bottom: 1em;"-->

<!-- panel->(blue) -->
describes the analysis pipeline used as well as the input reads dataset and which sequence annotations, if any, used.

<!-- .element: class="footer" style="bottom: -72%;" -->
[schema](https://ga4gh-schemas.readthedocs.io/en/latest/schemas/rna_quantification.proto.html#protobuf.RnaQuantification)


## ExpressionLevel 
<!-- .element: style="margin-bottom: 1em;"-->

<!-- panel->(blue) -->
contains the identity of the specific feature measured as well as the final resulting quantification from the pipeline.

<!-- .element: class="footer" style="bottom: -72%;" -->
[schema](https://ga4gh-schemas.readthedocs.io/en/latest/schemas/rna_quantification.proto.html#protobuf.ExpressionLevel)


## Use cases
<!-- .element: style="margin-bottom: 1em;"-->

1. Obtain quantification data for one or more features (genes) in an RNASeq experiment <!-- .element: style="margin-bottom: 0.5em;"-->
1. Obtain quantification data for one or more features (genes) for comparison between multiple RNASeq experiments <!-- .element: style="margin-bottom: 0.5em;"-->
1. Obtain input data to use in Assembly activities <!-- .element: style="margin-bottom: 0.5em;"-->
1. Obtain input data for DESeq Differential Expression analysis <!-- .element: style="margin-bottom: 0.5em;"-->
1. Obtain input data for RNASeq analysis by Kallisto software <!-- .element: style="margin-bottom: 0.5em;"-->
1. Obtain quantification data for non-read-based RNA experiments (MicroArrays)

------

# Reference server


## Implementation
<!-- .element: style="margin-bottom: 1em;"-->

A reference implementation of the APIs is under development and consists of three main components:<!-- .element: style="text-align: left;"-->

- schemas <!-- .element: class="impl"-->
- server 
- client 

<!-- panel->(red) -->
<!-- .element: style="margin-top: 1em;"-->
Server and client are currently under heavy development, and many aspects of the layout and APIs will change as requirements are better understood


## Schemas
<!-- .element: style="margin-bottom: 1em;"-->

Written in [Protocol Buffers](https://developers.google.com/protocol-buffers/docs/overview#whynotxml) Interface Description Language, e.g.

<!-- .element: style="margin-top: 1em;"-->
```proto
message RnaQuantificationSet {
  // The RNA quantification set ID.
  string id = 1;

  // The ID of the dataset this RNA Quantification set belongs to.
  string dataset_id = 2;

  // The RNA quantification set name.
  string name = 3;
}
```

<!-- panel -->
<!-- .element: style="margin-top: 1.5em;"-->
Specification through Protocol buffer `message` types in `.proto` files. Each `message` is a small logical record of information, containing a series of name-value pairs.

<!-- .element: style="margin-top: 2em;"-->
https://github.com/ga4gh/schemas


## Server
<!-- .element: style="margin-bottom: 1em;"-->

- written in Python (Python 2 support only) <!-- .element: style="margin-bottom: 0.5em;"-->
- Flask Web framework <!-- .element: style="margin-bottom: 0.5em;"-->
- SQLite persistence backend 

<!-- .element: style="margin-top: 2em;"-->
https://github.com/ga4gh/server


## Client
<!-- .element: style="margin-bottom: 1em;"-->

- written in Python (Python 2 support only) <!-- .element: style="margin-bottom: 0.5em;"-->
- API library <!-- .element: style="margin-bottom: 0.5em;"-->
- command line tool

<!-- .element: style="margin-top: 2em;"-->
https://github.com/ga4gh/ga4gh-client


## Demo server
<!-- .element: style="margin-bottom: 1em;"-->

<!-- panel->(blue) -->
<!-- .element: style="margin-bottom: 2em;"-->
A demo server instance hosting `Thousand Genomes Project` data is available

http://1kgenomes.ga4gh.org


## Demo notebooks
<!-- .element: style="margin-bottom: 1em;"-->

<!-- panel->(blue) -->
<!-- .element: style="margin-bottom: 2em;"-->
Example `IPython` notebooks are also available

<!-- .element: style="font-size: 0.8em;" -->
http://github.com/BD2KGenomics/bioapi-examples/tree/master/python_notebooks

------

# RNA API demo


## Driving projects
<!-- .element: style="margin-bottom: 0.8em;"-->

<!-- panel -->
__RGLab__ in collaboration with the __EGA team__ will provide a reference server instance loaded with `CLL` quantification data as a driving project to perform real life benchmarks/comparisons in the context of the RNAseq Task Team


## Data
<!-- .element: style="margin-bottom: 0.8em;"-->

Use quantification data from:
<!-- .element: style="margin-bottom: 1em; text-align: left; padding-left: 5em;"-->

1. processing `CLL` (Chronic Lymphocytic Leukemia) RNAseq data 
  - at __RGLab__ with GRCh38/Gencode 25
1. processing an `ENCODE` dataset 
  - at __Caltech__ with GRCh38/Gencode 25
1. already processed `BeatAML` (Acute Myeloid Leukemia) RNAseq data
  - at __Broad__ with GRCh37/Gencode ?


## GA4GH server instances
<!-- .element: style="margin-bottom: 0.8em;"-->

1. `CLL` data server instance - __EGA__ 
1. `ENCODE` and BeatAML server instance - __Caltech__


## Comparisons
<!-- .element: style="margin-bottom: 0.8em;"-->

- `1` vs `2` as a `CLL` vs `control` looking for differential expression
- `1` vs `3` as a _"we found 2 datasets online, how do they compare?"_ to see what advice/pitfalls we can illustrate

<!-- panel->(red) -->
<!-- .element: style="margin-top: 1em;"-->
all comparision will be performed by means of the API


## Work in progress
<!-- .element: style="margin-bottom: 1em;"-->

- running `GRAPE` pipeline on `CLL` RNAseq data 
- setting up `GA4GH` server instance

<!-- panel->(red) -->
<!-- .element: style="margin-top: 2em;"-->
`CLL` dataset: `EGAD00001001443`, 199 samples

------

# Possible Applications
<!-- .element: style="margin-bottom: 0.8em; font-size: 2.7em;"-->

- GRAPE API support <!-- .element: style="margin-bottom: 1em;"-->
- ERC data portal <!-- .element: style="margin-bottom: 1em;"-->
- server instance with all projects from the lab

------

# Thanks!<!-- .element: class="extra" -->

------

# Client Examples<!-- .element: class="extra" -->


## Search datasets
<!-- .element: style="margin-bottom: 1em;"-->

```bash
$ ga4gh_client datasets-search http://1kgenomes.ga4gh.org
```
```
WyIxa2dlbm9tZXMiXQ  1kgenomes
```


## Search feature sets (annotations)
<!-- .element: style="margin-bottom: 1em;"-->

```bash
$ ga4gh_client featuresets-search --datasetId WyIxa2dlbm9tZXMiXQ http://1kgenomes.ga4gh.org
```
```
WyIxa2dlbm9tZXMiLCJnZW5jb2RlX3YyNGxpZnQzNyJd  gencode_v24lift37
```


## Search genes within genomic region
<!-- .element: style="margin-bottom: 1em;"-->

```bash
$ ga4gh_client features-search -F WyIxa2dlbm9tZXMiLCJnZW5jb2RlX3YyNGxpZnQzNyJd -t gene -r chr1 -s 10000 -e 15000 http://1kgenomes.ga4gh.org
```
```
WyIxa2dlbm9tZXMiLCJnZW5jb2RlX3YyNGxpZnQzNyIsIjE0MDUwOTE4MzA4ODMzNiJd    WyIxa2dlbm9tZXMiLCJnZW5jb2RlX3YyNGxpZnQzNyJd  chr1  11869 14409 2 FeatureType: SO:0000704 gene  gene_status:values {
  string_value: "KNOWN"
}
; havana_gene:values {
  string_value: "OTTHUMG00000000961.2"
}
; remap_target_status:values {
  string_value: "overlap"
}
; level:values {
  string_value: "2"
}
; remap_num_mappings:values {
  string_value: "1"
}
; gene_id:values {
  string_value: "ENSG00000223972.5"
}
; gene_type:values {
  string_value: "transcribed_unprocessed_pseudogene"
}
; remap_status:values {
  string_value: "full_contig"
}
; ID:values {
  string_value: "ENSG00000223972.5"
}
; gene_name:values {
  string_value: "DDX11L1"
}
; 
WyIxa2dlbm9tZXMiLCJnZW5jb2RlX3YyNGxpZnQzNyIsIjE0MDUwOTE4MzA5MDUxMiJd    WyIxa2dlbm9tZXMiLCJnZW5jb2RlX3YyNGxpZnQzNyJd  chr1  14404 29570 1 FeatureType: SO:0000704 gene  gene_status:values {
  string_value: "KNOWN"
}
; havana_gene:values {
  string_value: "OTTHUMG00000000958.1"
}
; remap_target_status:values {
  string_value: "overlap"
}
; level:values {
  string_value: "2"
}
; remap_num_mappings:values {
  string_value: "1"
}
; gene_id:values {
  string_value: "ENSG00000227232.5"
}
; gene_type:values {
  string_value: "unprocessed_pseudogene"
}
; remap_status:values {
  string_value: "full_contig"
}
; ID:values {
  string_value: "ENSG00000227232.5"
}
; gene_name:values {
  string_value: "WASH7P"
}
; 
```


## Search RNA quantification sets
<!-- .element: style="margin-bottom: 1em;"-->

```bash
$ ga4gh_client rnaquantificationsets-search --datasetId WyIxa2dlbm9tZXMiXQ http://1kgenomes.ga4gh.org
```
```
WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iXQ  WyIxa2dlbm9tZXMiXQ  E-GEUV-1 RNA Quantification
```


## Search RNA quantifications
<!-- .element: style="margin-bottom: 1em;"-->

```bash
$ ga4gh_client rnaquantifications-search --rnaQuantificationSetId WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iXQ http://1kgenomes.ga4gh.org
```
```
WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMTA0Il0 RNA seq data from lymphoblastoid cell lines in the 1000 Genome Project, http://www.ebi.ac.uk/arrayexpress/experiments/E-GEUV-1/samples/ HG00104 WyIxa2dlbm9tZXMiLCJnZW5jb2RlX3YyNGxpZnQzNyJd  
WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMTAzIl0 RNA seq data from lymphoblastoid cell lines in the 1000 Genome Project, http://www.ebi.ac.uk/arrayexpress/experiments/E-GEUV-1/samples/ HG00103 WyIxa2dlbm9tZXMiLCJnZW5jb2RlX3YyNGxpZnQzNyJd  
WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMTAyIl0 RNA seq data from lymphoblastoid cell lines in the 1000 Genome Project, http://www.ebi.ac.uk/arrayexpress/experiments/E-GEUV-1/samples/ HG00102 WyIxa2dlbm9tZXMiLCJnZW5jb2RlX3YyNGxpZnQzNyJd  
WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMTAxIl0 RNA seq data from lymphoblastoid cell lines in the 1000 Genome Project, http://www.ebi.ac.uk/arrayexpress/experiments/E-GEUV-1/samples/ HG00101 WyIxa2dlbm9tZXMiLCJnZW5jb2RlX3YyNGxpZnQzNyJd  
WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMTAwIl0 RNA seq data from lymphoblastoid cell lines in the 1000 Genome Project, http://www.ebi.ac.uk/arrayexpress/experiments/E-GEUV-1/samples/ HG00100 WyIxa2dlbm9tZXMiLCJnZW5jb2RlX3YyNGxpZnQzNyJd  
WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMDk5Il0 RNA seq data from lymphoblastoid cell lines in the 1000 Genome Project, http://www.ebi.ac.uk/arrayexpress/experiments/E-GEUV-1/samples/ HG00099 WyIxa2dlbm9tZXMiLCJnZW5jb2RlX3YyNGxpZnQzNyJd  
WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMDk2Il0 RNA seq data from lymphoblastoid cell lines in the 1000 Genome Project, http://www.ebi.ac.uk/arrayexpress/experiments/E-GEUV-1/samples/ HG00096 WyIxa2dlbm9tZXMiLCJnZW5jb2RlX3YyNGxpZnQzNyJd
```


## Search expression levels
<!-- .element: style="margin-bottom: 1em;"-->

```bash
$ ga4gh_client expressionlevels-search --rnaQuantificationId WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMTA0Il0 http://1kgenomes.ga4gh.org
```
```
WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMTA0IiwiMzIxNWY3ZDgtNTNkZC00ZDU1LTgyMTUtZGZlOTMwMmEwZDBiIl0 3.17871 ENST00000619216.1 True  1.5 0.0 2 
WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMTA0IiwiNWEwZDY4OGItNDMyMC00Y2IzLWJkNzktNDc5MGJkNjI5NWU4Il0 0.161336  ENST00000469289.1 True  1.13687 0.0 2 
WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMTA0IiwiZjkyZTA3YjMtMzhjMC00YjcxLTlhMDYtNDJiOTZlMDhhYWU2Il0 1.92349 ENST00000461467.1 True  15.7391 0.0 2 
WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMTA0IiwiOGFhNjk2YzItYTgwOS00YzQxLWIyZTAtOWM0ZTdhNGFlNGZlIl0 0.695846  ENST00000466430.5 True  36.7243 0.0 2 
WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMTA0IiwiYjk4OGRlNjItOTFkNy00ZTBkLThmOTktNjNlYTEwZTk0NzZhIl0 0.00767201  ENST00000495576.1 True  0.178346  0.0 2 
WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMTA0IiwiYTc5N2ViZGQtZjFlZS00NjgyLWE3OWYtNTFmOTA2NWZiMDA3Il0 0.854432  ENST00000493797.1 True  2.34793 0.0 2 
WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMTA0IiwiYjE1ZGQyOGEtYWVlMC00ZGM2LTlkNmItNGNhMTAzZDRhMTQwIl0 0.662482  ENST00000484859.1 True  63.8771 0.0 2 
WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMTA0IiwiYTFmNGYwOTQtOWY0Zi00ZWIzLTg0OTUtOTJmOTBkOTFkNmMyIl0 1.04408 ENST00000466557.6 True  23.8826 0.0 2 
WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMTA0IiwiODU1NWFkOGYtOGFlNy00OTRjLTlkY2QtZDJhNDg0MDBiZmJlIl0 0.150866  ENST00000410691.1 True  0.0882353 0.0 2 
WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMTA0IiwiMzgyNzFhNmEtMzQzYS00YmZmLWJlMDktNzRiMGVhN2YxODYxIl0 0.919041  ENST00000496488.1 True  5.0 0.0 2
...
```


## Search expression level of a gene
<!-- .element: style="margin-bottom: 1em;"-->

```bash
$ ga4gh_client expressionlevels-search --rnaQuantificationId WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMTA0Il0 --featureIds ENST00000525634.5 http://1kgenomes.ga4gh.org
```
```
WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMTA0IiwiRU5TVDAwMDAwNTI1NjM0LjVIRzAwMTA0Il0 11914.7 ENST00000525634.5 True  11914.7 0.0 2
```