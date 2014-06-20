# Blueprint pipeline


## Blueprint pipeline
<!-- .element: style="margin-bottom: 1em;"-->
<div class="panel panel-default"><i class="fa fa-arrow-circle-right blue"></i> RNAseq pipeline written in Bash</div>
<!-- .element: style="margin-bottom: 2em;"-->

- mapping (GEMtools)
- bigwig
- contig
- quantification (Flux Capacitor)
- BAM statistics (RSeQC)


## Bash
<!-- .element: class="green"-->

```bash
#!/bin/bash
```

- widely supported on any Linux platform
<!-- .element: style="margin-top: 2em"-->
- most bioinformaticians are used to it


## SGE options
<!-- .element: class="green" style="margin-bottom: 1em;"-->

```bash
# Force bash shell
#$ -S /bin/bash
#
# Export environment variables
#$ -V
#
# Use current working directory as job working directory
#$ -cwd
#
# Rename stdout and stderr files
#$ -o $JOB_NAME.out
#$ -e $JOB_NAME.err
```
<!-- .element: style="margin-top: 3em"-->
<div class="panel panel-default">
Queue, memory and time **must** be specified when submitting the job.
</div>


## Modular execution
<!-- .element: class="green" style="margin-bottom: 0.6em;"-->

```
# getting pipeline steps to be executed
steps=(mapping bigwig contig flux)

if [[ "$@" ]]; then
    read -ra steps <<< "$@"
fi

for step in ${steps[@]}; do
    case $step in
        mapping)
            doMapping="true"
            ;;
        bigwig)
            doBigWig="true"
            ;;
        contig)
            doContig="true"
            ;;
        quant|flux)
            doFlux="true"
            ;;
    esac
done
```

Run specific steps:
<!-- .element: style="margin-top: 1em; text-align: left; margin-left: 1.5em;"-->
```bash
blueprint.pipeline.sh ... -- contig flux
```


## Monolitic pipeline
<!-- .element: class="red" style="margin-bottom: 1em;"-->

- pipeline steps are executed sequencially
- one cluster node per run is used <span class="red"> <i class="fa fa-arrow-right"></i> weak parallelization</span>
- bad resource management - not all steps use the same amount of cpus/memory


## Batch execution
<!-- .element: class="red" style="margin-bottom: 1em;"-->

Some extra code required:
<!-- .element: style="text-align: left; margin-left: 1.5em"-->

```bash
#!/bin/bash

base="/users/rg/epalumbo/projects/BluePrint"
threads="8"
vmem="64G"
fluxMem=$((${vmem:0:$((${#vmem}-1))}/2))${vmem:$((${#vmem}-1)):1}
rtime="72:00:00"
do=${1-"echo"}

while read lab id path strand sex; do
    quality="33"
    genome="$base/genome/Homo_sapiens.GRCh37.chromosomes.chr.fa"
    annotation="$base/annotation/gencode.v15.annotation.gtf"
    if [[ $sex == 'Female' ]]; then
        genome="$base/genome/Homo_sapiens.GRCh37.chromosomes.female.chr.fa"
        annotation="$base/annotation/gencode.v15.annotation.female.gtf"
    fi
    sample=`echo $id | cut -d"_" -f1`
    readGroup="ID=$id,PL=ILLUMINA,PU=$id,LB=Blueprint,SM=$sample,DT=`date +"%Y-%m-%dT%H:%M:%S%z"`,CN=$lab,DS=Blueprint"
    command="qsub -pe smp $threads -l virtual_free=$vmem,h_rt=$rtime -q rg-el6,long -N $id.pipeline"
    command=$command" ../blueprint.pipeline.sh -i `basename $path` -g $genome -a $annotation -q $quality -t $threads --paired --read-group $readGroup -r 150 --read-strand ${strand^^} --flux-mem $fluxMem"

    if [ ! -d $id ]; then
        $do "mkdir $id"
        $do "ln -s $path $id"
        $do "ln -s ${path//_1/_2} $id"
    fi
    $do "cd $id"
    $do "$command"
    $do "cd ..""
done
```


## Data management
<!-- .element: class="red" style="margin-bottom: 1em;"-->

User has to keep metadata and file information:
<!-- .element: style="margin-bottom: 1em;"-->

- tsv/csv files
- Google spreadsheets
- Index files <!-- .element: class="fragment grow" -->

------

# Idxtools
<a href="https://github.com/emi80/idxtools"><h3><i class="fa fa-github-square"> github.com/emi80/idxtools</i></h3></a>


## Index files
<!-- .element: style="margin-bottom: 1em;"-->
<div class="panel panel-default"><i class="fa fa-arrow-circle-right blue"></i> Plain text database files to store metadata information for files and their content</div>


## Format
<!-- .element: style="margin-bottom: 1em;"-->

```markdown
<filepath>TAB<attributes_list>
```

<!-- .element: style="margin-bottom: 1em; margin-top: 3em;"-->
with `attribute_list` as a semicolon separated list of `key=value` strings:

```markdown
/path/to/file    size=100; id=1; class=MyClass; type=MyType
```


## Idxtools
<!-- .element: style="margin-bottom: 1em;"-->
<div class="panel panel-default"><i class="fa fa-arrow-circle-right blue"></i> Python API and commandline tool to **create**, **query** and **modify** index files</div>


## Model
<!-- .element: style="margin-bottom: 1em;"-->
<div class="panel panel-default"><i class="fa fa-arrow-circle-right blue"></i><span class="blue"> Dataset</span> is the main data object</div>
<!-- .element: style="margin-bottom: 1em;"-->

Metadata:
<!-- .element: style="margin-top: 1em; text-align: left; margin-left: 1.5em;"-->
```markdown
.   id=test1; quality=33; sex=female;
```

Files:
<!-- .element: style="margin-top: 1em; text-align: left; margin-left: 1.5em;"-->
```markdown
/data/test1_1.fastq.gz id=test1; quality=33; sex=female; type=fastq; view=FqRd1;
/data/test1.bam id=test1; quality=33; sex=female; type=bam; view=Alignments;
```


## Format.json
<!-- .element: style="margin-bottom: 1em;"-->
<div class="panel panel-default"><i class="fa fa-arrow-circle-right blue"></i> Specifies the syntax and vocabulary of an index file</div>
<!-- .element: style="margin-bottom: 1em;"-->

```json
{
  "colsep": "\t",
  "id": "labExpId",
  "kw_sep": " ",
  "sep": "=",
  "trail": ";",
  "fileinfo": [
    "path",
    "size",
    "md5",
    "type",
    "view"
  ]
}
```


## Mapping attribute keys
<!-- .element: style="margin-bottom: 1em;"-->

Useful when importing from csv/tsv:
<!-- .element: style="margin-bottom: 1em; text-align: left; margin-left: 1.5em"-->

```json
{
  "colsep": "\t",
  "sep": "=",
  "trail": ";",
  "kw_sep": " ",
  "id": "labExpId",
  "fileinfo": [
    "path",
    "size",
    "md5",
    "type",
    "view",
    "submittedDataVersion"
  ],
  "map": {
    "BASE_COUNT": "baseCount",
    "BIOMATERIAL_PROVIDER": "",
    "BIOMATERIAL_TYPE": "localization",
    "CELL_TYPE": "cell",
    "CENTER_NAME": "lab",
    "DISEASE": "",
    "DONOR_AGE": "age",
    "DONOR_ETHNICITY": "ethnicity",
    "DONOR_HEALTH_STATUS": "",
    "DONOR_ID": "donorId",
    "DONOR_REGION_OF_RESIDENCE": "",
    "DONOR_SEX": "sex",
    "EXPERIMENT_ID": "",
    "EXPERIMENT_TYPE": "",
    "_FILE": "path",
    "FILE_MD5": "md5",
    "FILE_SIZE": "size",
    "FIRST_SUBMISSION_DATE": "dateSubmittedFirst",
    "INSTRUMENT_MODEL": "",
    "INSTRUMENT_PLATFORM": "seqPlatform",
    "LIBRARY_LAYOUT": "",
    "LIBRARY_NAME": "libProtocol",
    "LIBRARY_STRATEGY": "dataType",
    "MOLECULE": "rnaExtract",
    "READ_COUNT": "readCount",
    "READ_TYPE": "readType",
    "READ_QUALITIES": "quality",
    "READ_STRAND": "readStrand",
    "RUN_ID": "labExpId",
    "RUN_NAME": "",
    "SAMPLE_ID": "sraSampleAccession",
    "SAMPLE_NAME": "labProtocolId",
    "SEQ_RUNS_COUNT": "seqRun",
    "SPECIMEN_PROCESSING": "",
    "SPECIMEN_STORAGE": "",
    "STUDY_ID": "sraStudyAccession",
    "STUDY_NAME": "",
    "SUBMISSION_DATE": "dateSubmitted",
    "SUBMISSION_ID": "",
    "TISSUE": "tissue",
    "TWIN_PAIR_ID": "",
    "TYPE": "type",
    "WITHDRAWN": ""
  }
}
```


## Specifying index and format files
<!-- .element: style="margin-bottom: 0.6em;"-->
<div class="panel panel-default"><i class="fa fa-arrow-circle-right blue"></i> Index and format files can be specified as <span class="blue">command line options</span> or as <span class="blue">environment variables</span></div>
<!-- .element: style="margin-bottom: 1.4em;"-->

```bash
# command line
$ idxtools -i index.txt -f format.json [command]

# environment variables
export IDX_FILE=/path/to/index.txt
export IDX_FORMAT=/path/to/format.json

$ idxtools show
```
<div class="panel panel-default">Using absolute paths to make the index available from any folder</div>
<!-- .element: style="margin-top: 1em;"-->


## Importing TSV/CSV
<!-- .element: style="margin-bottom: 1em;"-->

A CSV file, `test.csv`:

```markdown
path,labExpId,quality,sex,type,view
/data/test1_1.fastq.gz,test1,33,female,fastq,FqRd1
/data/test1_2.fastq.gz,test1,33,female,fastq,FqRd2
/data/test2_1.fastq.gz,test2,64,male,fastq,FqRd1
/data/test2_2.fastq.gz,test2,64,male,fastq,FqRd2
/data/test2.bam,test2,64,male,bam,Alignments
```

<!-- .element: style="margin-top: 1em; text-align: left; margin-left:1.5em;"-->
```bash
# import csv and show
$ export IDX_FORMAT=$PWD/format.json
$ idxtools -i test.csv show
/data/test1_1.fastq.gz labExpId=test1; type=fastq; view=FqRd1; quality=33; sex=female;
/data/test1_2.fastq.gz labExpId=test1; type=fastq; view=FqRd2; quality=33; sex=female;
/data/test2_1.fastq.gz labExpId=test2; type=fastq; view=FqRd1; quality=64; sex=male;
/data/test2_2.fastq.gz labExpId=test2; type=fastq; view=FqRd2; quality=64; sex=male;
/data/test2.bam    labExpId=test2; type=bam; view=Alignments; quality=64; sex=male;

# import csv and save to file
$ idxtools -i test.csv -f format.json show -o index.txt
$ export IDX_FILE=$PWD/index.txt
```


## Querying the index
<!-- .element: style="margin-bottom: 1em;"-->

```bash
# query by attributes
$ idxtools show id=test2
/data/test2_1.fastq.gz labExpId=test2; type=fastq; view=FqRd1; quality=64; sex=male;
/data/test2_2.fastq.gz labExpId=test2; type=fastq; view=FqRd2; quality=64; sex=male;
/data/test2.bam    labExpId=test2; type=bam; view=Alignments; quality=64; sex=male;

$ idxtools show view=FqRd1
./data/test1_1.fastq.gz labExpId=test1; type=fastq; view=FqRd1; quality=33; sex=female;
./data/test2_1.fastq.gz labExpId=test2; type=fastq; view=FqRd1; quality=64; sex=male;

$ idxtools show type=bam
./data/test2.bam    labExpId=test2; type=bam; view=Alignments; quality=64; sex=male;
```


## Querying the index
<!-- .element: style="margin-bottom: 1em;"-->

```bash
# queries use regular expressions
# query by id starting with t
$ idxtools show id=t # equivalent to: idxtools show id="^t"
/data/test1_1.fastq.gz labExpId=test1; type=fastq; view=FqRd1; quality=33; sex=female;
/data/test1_2.fastq.gz labExpId=test1; type=fastq; view=FqRd2; quality=33; sex=female;
/data/test2_1.fastq.gz labExpId=test2; type=fastq; view=FqRd1; quality=64; sex=male;
/data/test2_2.fastq.gz labExpId=test2; type=fastq; view=FqRd2; quality=64; sex=male;
/data/test2.bam    labExpId=test2; type=bam; view=Alignments; quality=64; sex=male;

# exact queries
$ idxtools show id=t --exact

# operations on numeric attributes
$ idxtools show quality=">40"
/data/test2_1.fastq.gz labExpId=test2; type=fastq; view=FqRd1; quality=64; sex=male;
/data/test2_2.fastq.gz labExpId=test2; type=fastq; view=FqRd2; quality=64; sex=male;
/data/test2.bam    labExpId=test2; type=bam; view=Alignments; quality=64; sex=male;
$ idxtools show quality="<40"
/data/test1_1.fastq.gz labExpId=test1; type=fastq; view=FqRd1; quality=33; sex=female;
/data/test1_2.fastq.gz labExpId=test1; type=fastq; view=FqRd2; quality=33; sex=female;
```


## Query output
<!-- .element: style="margin-bottom: 0.6em;"-->
<div class="panel panel-default"><i class="fa fa-arrow-circle-right blue"></i> The default output format is the <span class="blue">index file format</span> but it can be changed to TSV with the `-t` option</div>
<!-- .element: style="margin-bottom: 1em;"-->

```bash
# TSV output - single attribute
$ idxtools show view=FqRd1 -t path
/data/test1_1.fastq.gz
/data/test2_1.fastq.gz

# TSV output - multiple attributes
$ idxtools show view=FqRd1 -t id,path
test1   ./data/test1_1.fastq.gz
test2   ./data/test2_1.fastq.gz

# with header
$ idxtools show view=FqRd1 -t id,path --header
id  path
test1   ./data/test1_1.fastq.gz
test2   ./data/test2_1.fastq.gz

```
<!-- .element: style="margin-top: 1em;"-->
<div class="panel panel-default">attribute names <i class="fa fa-arrow-right"></i> comma separated list with <strong>NO</strong> space</div>


## Adding files
<!-- .element: style="margin-bottom: 1em;"-->
<div class="panel panel-default"><i class="fa fa-arrow-circle-right blue"></i> Files can be easily added to the index</div>
<!-- .element: style="margin-bottom: 1em;"-->

```bash
# add /data/test1.bam
$ idxtools add path=/data/test1.bam id=test1 type=bam view=Alignments

# check
$ idxtools show type=bam
/data/test1.bam    labExpId=test1; type=bam; view=Alignments; quality=33; sex=female;
/data/test2.bam    labExpId=test2; type=bam; view=Alignments; quality=64; sex=male;

```


## Removing files
<!-- .element: style="margin-bottom: 1em;"-->
<div class="panel panel-default"><i class="fa fa-arrow-circle-right blue"></i> Files can be easily removed from the index</div>
<!-- .element: style="margin-bottom: 1em;"-->

```bash
# remove /data/test1.bam
$ idxtools remove /data/test1.bam

# check
$ idxtools show type=bam
/data/test2.bam    labExpId=test2; type=bam; view=Alignments; quality=64; sex=male;

```


## Removing datasets
<!-- .element: style="margin-bottom: 1em;"-->
<div class="panel panel-default"><i class="fa fa-arrow-circle-right blue"></i> Datasets can also be removed from the index</div>
<!-- .element: style="margin-bottom: 1em;"-->

```bash
# remove test2
$ idxtools remove id=test2

# check
$ idxtools show
./data/test1_1.fastq.gz labExpId=test1; type=fastq; view=FqRd1; quality=33; sex=female;
./data/test1_2.fastq.gz labExpId=test1; type=fastq; view=FqRd2; quality=33; sex=female;
```
------

# JIP
<a href="//pyjip.readthedocs.org"><h3><i class="fa fa-external-link-square"> pyjip.readthedocs.org</i></h3></a>


## JIP
<!-- .element: style="margin-bottom: 0.6em;"-->
<div class="panel panel-default"><i class="fa fa-arrow-circle-right blue"></i> A pipeline system that helps to manage large numbers of jobs on a compute cluster</div>
<!-- .element: style="margin-bottom: 2em;"-->

- dependency support
- automatic expansions
- simplified management of jobs and resources


## Cluster configuration
<!-- .element: style="margin-bottom: 1em;"-->
```json
{
    "cluster": "jip.cluster.SGE",
    "sge" : {
        "threads_pe": "smp",
        "time_limit": "h_rt"
    },
    "profiles": {
        "default": {
            "queue": "short,long,rg-el6",
            "time": "3h"
        },

        "long": {
            "queue": "long,rg-el6",
            "time": "24h",
            "mem": "64G"
        },
        "short": {
            "queue": "short",
            "time": "6h",
            "mem": "16G"
        }
    }
}

```


## Run or submit commands
<!-- .element: style="margin-bottom: 1em;"-->

The `jip bash` command:

```bash
# run `hostname` locally
$ jip bash -c hostname

# submit
$ jip bash -s -c hostname
```
<!-- .element: style="margin-bottom: 3em;"-->

Check jobs with `jip jobs`:

```bash
# check the status of the job
$ jip jobs
```
------

# Nextflow
<a href="//www.nextflow.io"><h3><i class="fa fa-external-link-square"> www.nextflow.io</i></h3></a>
------

# Grape 2
<a href="//grape-pipeline.readthedocs.org"><h3><i class="fa fa-external-link-square"> grape-pipeline.readthedocs.org</i></h3></a>

<!-- ------

# Modules
<div class="panel panel-default blue">Software environement managment</font></div>

<!-- ------

# SOLiD pipeline -->
